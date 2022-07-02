const multer = require('multer');
const parser = multer({ dest: 'public/uploads/' })

module.exports = async (req, res) => {
    parser.single('article')(req, res, err => {
        if (err)
            res.status(500).json({ error: 1, payload: err });
        else {
            const image = {};
            image.id = req.file.filename;
            image.url = `/uploads/notice-${image.id}`;
            res.status(200).json({ error: 0, payload: { id: image.id, url: image.url } });
        }
    });
}