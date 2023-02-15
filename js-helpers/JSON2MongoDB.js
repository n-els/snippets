// IMPORT
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '/config.env' });
const fs = require('fs');

// Import the specific mongoose Model
const mongoModel = require('./../../models/mongoModel);

// CREATE THE DATABASE AND SET PASSWORD FOR THE FROM THE ENVIRONMENT VARIABLES
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// CONNECT TO THE DATABASE
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE AND PARSE/CONVERT THE DATA TO JAVASCRIPT OBJECT
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

// IMPORT DATA INTO DATABASE

const importData = async () => {
  try {
    await mongoModel.create(data)
    console.log('Data successfully loaded!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// DELETE ALL DATA FROM COLLECTION

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
