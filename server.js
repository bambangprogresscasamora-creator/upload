const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import CORS package
const app = express();

// Gunakan CORS untuk mengizinkan semua domain
app.use(cors());

// Setup multer untuk menyimpan file di folder "uploads"
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Membuat folder "uploads" jika belum ada
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Menangani upload gambar
app.post('/upload', upload.single('image'), (req, res) => {
    const uploadedFile = req.file;
    if (uploadedFile) {
        res.send(uploadedFile.filename); // Kirim nama file gambar yang di-upload
    } else {
        res.status(400).send('Tidak ada gambar yang di-upload');
    }
});

// Menyajikan file yang di-upload melalui URL
app.use('/uploads', express.static('uploads'));

// Menjalankan server di port 3000
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
