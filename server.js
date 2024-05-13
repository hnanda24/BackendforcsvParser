const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const csvtojson = require('csvtojson');
const cors = require('cors');

const fs = require('fs');
const CSVModel = require('./CSVModel');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://hnanda005:zkQkhtDTGowGgLKO@cluster0.spn9flj.mongodb.net/csvParser', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(cors()); // Enable CORS for all origins
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(process.cwd(), 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(process.cwd(), 'public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get('/get-data', async (req, res) => {
  try {
      const data = await CSVModel.find({}, { _id: 0, __v: 0 }); // Exclude _id and __v fields
      res.json(data);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/insert-data', upload.single('csvFile'), async (req, res) => { // Ensure 'csvFile' matches the name attribute in HTML form
    var userData = [];
    const response = await csvtojson().fromFile(req.file.path);
    console.log(response);

    for (var i = 0; i < response.length; i++) {
        userData.push({
            name: response[i].name,
            email: response[i].email,
            age: response[i].age,
          });
        }

        await CSVModel.insertMany(userData);
    
    res.send({ status: 200, success: true, msg: 'CSV imported' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
