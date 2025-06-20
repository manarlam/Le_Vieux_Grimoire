const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

// Configration Multer
const storage = multer.diskStorage({
    // Enregistrement des fichiers dans le dossier images
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // 
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

// Gestion des téléchargements d'images
module.exports = multer({ storage }).single('image');