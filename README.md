# Quest App

Task manager dengan pendekatan gamifikasi. Aktivitas ditampilkan sebagai quest, dengan progress XP, halaman quest yang selesai, serta katalog reward.

## Alur aplikasi

Pengguna masuk melalui halaman login. Setelah sesi tersedia, aplikasi mengarahkan ke dashboard. Halaman utama lain meliputi `/quests`, `/completed`, dan `/rewards`; state quest dibagikan melalui `lib/QuestContext.tsx`.

## Teknologi

- Next.js 16 (App Router), React 19, TypeScript.
- Tailwind CSS 4.
- Firebase SDK untuk integrasi akun dan data.

## Menjalankan

Gunakan Node.js yang kompatibel dengan Next.js 16.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Konfigurasi Firebase berada di `lib/firebase.js`; sesuaikan dengan Firebase project yang akan digunakan. Jangan menempatkan private key atau service-account credential di kode client.

## Struktur penting

```text
app/                 Route login, dashboard, quest, reward
components/          QuestCard, XP bar, sidebar, tambah task
lib/QuestContext.tsx State quest dan akun
lib/firebase.js      Inisialisasi Firebase
```

## Pemeriksaan

```bash
npm run lint
npm run build
```

Belum ada skrip automated test dalam `package.json`. Verifikasi alur login, penambahan quest, penyelesaian quest, dan perhitungan XP sebelum dipakai untuk data pribadi.
