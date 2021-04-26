IF3250-08-jds1-CrowdSource


#Environment Variabel
1. Tambahkan environtment variabel dengan membuat file .env pada root (satu folder dengan package.json) file backend dan frontend
2. Isi .env pada frontend adalah
REACT_APP_PUBLIC_RECAPTHCA_SITE_KEY = xxx
dengan xxx adalah site key
3. Isi .env pada backend adalah
  RECAPTCHA_SECRET_KEY= yyy
dengan xxx adalah sitekey, dan yyy adalah secret key
4. Pastikan selalu menjalankan ulang apabila telah merubah file .env
5. Pastikan file .env tidak terpush