# JKT48 Fan Playground

Web interaktif buatan fans untuk fans JKT48 dengan dua mode permainan: **Ultimate Idol** dan **Draft Pick**. Seluruh data mencakup 58 member aktif lintas 4 tim (`Team Love`, `Team Dream`, `Team Passion`, dan `Trainee`), berjalan sepenuhnya di sisi klien tanpa backend.

## Mode Permainan

### 1. Ultimate Idol (`/ultimate-idol/`)
Susun matriks idol impianmu berisi 45 slot dari 9 kategori (*Visual, Dance, Vocal, Fan Service, MC, Stage Performance, Fashion Sense, Leadership, dan Aura*) pada 5 kolom tim (*Love, Dream, Passion, Trainee, dan All-Star JKT48*).

- Pemilihan member melalui popup pencarian dan filter tim.
- Dua pilihan tampilan: tema gelap bawaan dan **Mode Excel Classic**.
- Progres otomatis tersimpan di `localStorage`.
- Ekspor tabel matriks langsung menjadi gambar `.jpg`.

### 2. Draft Pick (`/draft-pick/`)
Adu strategi menyusun line-up JKT48 secara bergantian untuk 2 player menggunakan roda roulette dengan sistem **PICK** dan **BAN**.

- **Setup fleksibel:** atur nama 2 player, penentuan giliran pertama (`Player 1`, `Player 2`, atau `Acak`), dan pool tim yang masuk ke roulette.
- **Roulette & Shuffle:** member yang sudah di-pick atau di-ban otomatis keluar dari roda; urutan nama bisa diacak ulang sebelum diputar.
- **PICK & BAN:** tempatkan member pada 9 kategori (*Captain, Center, Variety, All Rounder, Dance, Stage Perform, Fan Service, Visual, dan Vocal*) atau buang hingga maksimal 3x ban per player (khusus pool Trainee saja berjalan tanpa ban).
- **Riwayat & Penilaian:** pantau kronologi aksi di panel riwayat, lalu tandai pemenang tiap kategori setelah semua slot terisi untuk menghitung skor akhir dan mengunduh papan hasil sebagai `.jpg`.

## Struktur Direktori

```text
jkt48-ultimate-idol/
├── index.html                  # Halaman utama pemilihan mode permainan
├── assets/
│   ├── logo/                   # Logo dan favicon
│   └── members/                # Foto 58 member (team-love, team-dream, team-passion, trainee)
├── styles/
│   ├── home.css                # Styling halaman utama
│   └── style.css               # Base styling bersama (header, modal, tombol, toast)
├── utils/
│   └── members.js              # Data 58 member bersama dan helper path foto
├── ultimate-idol/
│   ├── index.html              # Halaman game Ultimate Idol
│   ├── ulti.css                # Styling khusus Ultimate Idol
│   └── ulti.js                 # Logika matriks, picker, dan ekspor gambar
└── draft-pick/
    ├── index.html              # Halaman game Draft Pick
    ├── draft.css               # Styling khusus Draft Pick
    └── draft.js                # Logika roulette, Pick & Ban, judging, dan ekspor gambar
```

## Tech Stack

- **HTML5, Vanilla CSS, dan Vanilla JavaScript** tanpa framework build.
- **HTML5 Canvas** untuk render roda roulette Draft Pick.
- **[Lucide Icons](https://lucide.dev/)** untuk ikon antarmuka pada halaman game.
- **[html2canvas](https://html2canvas.hertzen.com/)** untuk merender papan menjadi gambar `.jpg`.

## Kontributor

- **Website Concept & Development:** [ALBANIDAV](https://github.com/ALBANIDAV)
- **Web Developer & Refinement:** [RaihanFerdy](https://github.com/RaihanFerdy)

## Disclaimer

Proyek ini dibuat murni untuk hiburan antar-fans JKT48. Setiap susunan matriks maupun hasil penilaian Draft Pick sepenuhnya merupakan opini pribadi pengguna dan bukan penilaian resmi terhadap member mana pun.
