# IF3250-08-jds1-CrowdSource
## Jabar Survei Kelompok 8 PPL

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

#### Konfigurasi environtment variables

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
