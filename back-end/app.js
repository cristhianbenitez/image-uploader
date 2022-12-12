const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

app.use(cors());

app.post('/image', upload.single('file'), function (req, res) {
  console.log(req.file);
  if (!req.file) {
    console.log('No file received');
    return res.send({
      success: false
    });
  } else {
    console.log('file received');
    return res.send({
      success: true
    });
  }
});

app.listen(port, () => console.log(`listening at http:localhost:${port}`));
