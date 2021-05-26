require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose =  require('mongoose');
const router = require('./src/routes/routes');

const PORT = process.env.PORT || 8080;
const URI = process.env.ATLAS_URI;

const app = express();

mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Connection Successful'))
  .catch(err => console.log(`Error in DB connection ${err}`));

app.use(cors({
  origin: process.env.CLIENT_PUBLIC_URL || 'http://localhost:3000'
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb', }));
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on: ${PORT}`);
});