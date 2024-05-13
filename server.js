// const express = require('express');
// const mongoose = require('mongoose');
// const fs = require('fs');

// const app = express();
// const PORT = 3000;

// const csvSchema = new mongoose.Schema({
//     serialNo: String,
//     name: String,
// });

// const CSVModel = mongoose.model('CSVModel', csvSchema);

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://hnanda005:zkQkhtDTGowGgLKO@cluster0.spn9flj.mongodb.net/csvParser', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('Connected to MongoDB');
// })
// .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
// });

// // Define a route to handle data insertion
// app.get('/insert-data', (req, res) => {
//     try {
//         // Read the CSV file
//         const csv = fs.readFileSync("CSV_file.csv");

//         // Convert the data to String and split it into an array
//         const array = csv.toString().split("\r");

//         // All the rows of the CSV will be converted to JSON objects
//         // which will be added to result in an array
//         let result = [];

//         // The array[0] contains all the header columns so we store them in headers array
//         let headers = array[0].split(", ");

//         // Since headers are separated, we need to traverse remaining n-1 rows.
//         for (let i = 1; i < array.length - 1; i++) {
//             let obj = {};

//             // Create an empty object to later add values of the current row to it
//             let str = array[i];
//             let s = '';

//             // By Default, we get the comma-separated values of a cell in quotes " " 
//             // so we use a flag to keep track of quotes and split the string accordingly
//             let flag = 0;
//             for (let ch of str) {
//                 if (ch === '"' && flag === 0) {
//                     flag = 1;
//                 } else if (ch === '"' && flag === 1) {
//                     flag = 0;
//                 }
//                 if (ch === ', ' && flag === 0) {
//                     ch = '|';
//                 }
//                 if (ch !== '"') {
//                     s += ch;
//                 }
//             }

//             // Split the string using pipe delimiter | and store the values in a properties array
//             let properties = s.split("|");

//             // For each header, if the value contains multiple comma-separated data,
//             // then we store it in the form of an array otherwise directly the value is stored
//             for (let j in headers) {
//                 if (properties[j].includes(", ")) {
//                     obj[headers[j]] = properties[j]
//                         .split(", ").map(item => item.trim());
//                 } else {
//                     obj[headers[j]] = properties[j];
//                 }
//             }

//             // Add the generated object to our result array
//             result.push(obj);
//         }

//         // Save each object to the MongoDB collection
//         result.forEach(async (data) => {
//             try {
//                 await CSVModel.create(data);
//                 console.log('Data saved successfully');
//             } catch (error) {
//                 console.error('Error saving data:', error);
//             }
//         });

//         res.send('Data insertion successful');
//     } catch (error) {
//         console.error('Error processing data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });