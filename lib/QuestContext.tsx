"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

interface Task {
  id: string;
  title: string;
  difficulty: string;
  xpReward: number;
  isCompleted: boolean;
  createdAt: any;
}

interface UserData {
  level: number;
  xp: number;
  streak: number;
  lastCompleted: any;
}

interface QuestContextType {
  user: any;
  userData: UserData | null;
  tasks: Task[];
  loading: boolean;
  addTask: (title: string, difficulty: string) => Promise<void>;
  completeTask: (task: Task) => Promise<void>;
  logout: () => Promise<void>;
}

const QuestContext = createContext<QuestContextType | null>(null);

export function useQuest() {
  const ctx = useContext(QuestContext);
  if (!ctx) throw new Error("useQuest must be used inside QuestProvider");
  return ctx;
}

export function QuestProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) setLoading(false);
    });
  }, []);

  const userRef = user ? doc(db, "users", user.uid) : null;
  const taskRef = user ? collection(db, "users", user.uid, "tasks") : null;

  const fetchAll = async () => {
    if (!userRef || !taskRef) return;

    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        level: 1,
        xp: 0,
        streak: 0,
        lastCompleted: null,
      });
    }

    const data = (await getDoc(userRef)).data();
    setUserData({
      level: Number(data?.level) || 1,
      xp: Number(data?.xp) || 0,
      streak: Number(data?.streak) || 0,
      lastCompleted: data?.lastCompleted ?? null,
    });
    setLoading(false);

    const t = await getDocs(taskRef);
    setTasks(
      t.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        xpReward: Number(d.data().xpReward) || 0,
      })) as Task[]
    );
  };

  useEffect(() => {
    if (user) fetchAll();
  }, [user]);

  const getXP = (difficulty: string) =>
    difficulty === "easy" ? 10 : difficulty === "medium" ? 25 : 50;

  const addTask = async (title: string, difficulty: string) => {
    if (!taskRef) return;
    await addDoc(taskRef, {
      title,
      difficulty,
      xpReward: getXP(difficulty),
      isCompleted: false,
      createdAt: serverTimestamp(),
    });
    fetchAll();
  };

  const completeTask = async (task: Task) => {
    if (!taskRef || !userRef || !userData) return;
    await updateDoc(doc(taskRef, task.id), { isCompleted: true });

    let xp = userData.xp + task.xpReward;
    let level = userData.level;
    while (xp >= 100 * level) {
      xp -= 100 * level;
      level++;
    }
    await updateDoc(userRef, { xp, level });
    fetchAll();
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    setUserData(null);
    setTasks([]);
  };

  return (
    <QuestContext.Provider
      value={{ user, userData, tasks, loading, addTask, completeTask, logout }}
    >
      {children}
    </QuestContext.Provider>
  );
}