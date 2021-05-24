# Jabar Survei Kelompok 8

## Deskripsi
Aplikasi Jabar Survei merupakan aplikasi berbasis web yang digunakan untuk melakukan proses crowdsourcing di Jawa Barat, yaitu pembuatan survei dan pengisian survei oleh para pengguna web. Link survei dapat dibagikan dengan mudah sehingga dapat memperluas cakupan responden. Hasil dari respons survei tersedia dalam bentuk tabel yang dapat didownload dalam file excel dan dalam bentuk visualisasi data berupa grafik dan diagram. 

## Getting Started
### Prerequisites
* MySQL versi 8.0.19 (MySQL Community Server)
* NodeJS  versi 12.16.3
* npm versi 6.14.4 atau yarn versi 1.22.4

### Installation
#### Menyiapkan database
1. Buka terminal atau command prompt pada folder database
2. Jalankan mysql dengan menuliskan command berikut pada terminal
```
mysql -u root
```
3. Buat sebuah database baru dengan nama `crowdsource` dengan menuliskan command berikut
```
create database crowdsource;
```
4. Keluar dari mysql dengan mengetikan `ctrl + Z`
5. Import file database crowdsource.sql ke dalam database crowdsource yang sudah dibuat tadi dengan mengetikan command berikut
```
mysql -u root crowdsource < crowdsource.sql
```
6. Jika diperlukan, konfigurasikan basis data tersebut pada file backend/app/config/db.config.js sebagai berikut dan sesuaikan user dan password dengan username dan password MySQL yang sedang digunakan.
```
host : ‘localhost’,
user : ‘root’,
password : ‘’,
database : ‘crowdsource’
```


#### Instalasi npm atau yarn Backend
1. Buka terminal ada command prompt pada folder backend
2. Ketikan command berikut untuk melakukan instalasi dependencies backend
```
npm install
```
atau
```
yarn install
```
3. Tunggu hingga proses instalasi selesai dan pastikan tidak ada error

#### Instalasi npm atau yarn Frontend
1. Buka terminal ada command prompt pada folder frontend
2. Ketikan command berikut untuk melakukan instalasi dependencies frontend
```
npm install
```
atau
```
yarn install
```
3. Tunggu hingga proses instalasi selesai dan pastikan tidak ada error

#### Konfigurasi RECAPTCHA
RECAPTCHA digunakan pada form survei untuk memastikan pengisian survei hanya dilakukan oleh manusia, bukan bot. Anda perlu mendaftarkan google recaptcha untuk memperoleh site key dan secret key yang akan digunakan kemudian. Berikut langkah-langkah untuk mendaftar ke google recaptcha.
1. Kunjungi https://www.google.com/recaptcha/admin/create
2. Isikan field label dengan "jabarsurvei" lalu pilih `reCAPTCHA v2"` dengan sub pilihan `"I'm not a robot" Checkbox`.
3. Tambahkan domain `localhost` atau domain frontend yang nantinya akan digunakan.
4. Check pilihan `Accept the reCAPTCHA Terms of Service`
5. Klik Submit
7. Anda akan dialihkan ke halaman lain yang berisi site key dan secret key.

#### Konfigurasi environtment variables
1. Tambahkan environtment variabel dengan membuat file .env pada folder backend dan frontend.
2. Isikan variable berikut pada file .env frontend
```
REACT_APP_PUBLIC_RECAPTHCA_SITE_KEY = xxx
```
dengan xxx adalah site key yang diperoleh dari reCAPTCHA yang telah dibuat sebelumnya.

3. Isikan variable berikut pada file .env backend
```
RECAPTCHA_SECRET_KEY= yyy
```
dengan yyy adalah secret key yang diperoleh dari reCAPTCHA yang telah dibuat sebelumnya.

### Running the App
#### Menjalankan Backend
1. Buka terminal ada command prompt pada folder backend
2. Ketikan command berikut untuk menjalankan backend
```
npm start
```
atau
```
yarn start
```
3. Jika proses berhasil, akan muncul tulisan berikut pada terminal
```
Server is running on port 5000.
Database Connected!
```

#### Menjalankan Frontend
1. Buka terminal ada command prompt pada folder frontend
2. Ketikan command berikut untuk menjalankan backend
```
npm start
```
atau
```
yarn start
```
3. Tunggu hingga proses selesai.
4. Jika browser tidak secara otomatis terbuka, ketikan alamat berikut pada browser Anda
```
http://localhost:3000
```


## Build With
* <a href = https://reactjs.org/>ReactJS</a>
* <a href = https://nodejs.org/en/>NodeJS</a>
* <a href = https://formbuilder.online/>formbuilder.online</a>
