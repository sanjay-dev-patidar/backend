const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

// Connect to MongoDB (mydb)
const mongoURIMyDB = process.env.MONGODB_URI_MYDB;

mongoose.connect(mongoURIMyDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB (mydb)');
})
.catch(error => {
  console.error('Error connecting to MongoDB (mydb):', error);
});
const AgeOfAI = mongoose.model('ageofai', {
  title: String,
  overview: [String],
  keypoints: [String],
});

const DevTools = mongoose.model('devtools', {
  title: String,
  overview: [String],
  CourseDetails: [String],
  keypoints: [String],
  imageURL: [String],
  videoURL: [String],
});

const WebDev = mongoose.model('webdev', {
  title: String,
  overview: [String],
  description: [String],
  keypoints: [String],
});

const Road = mongoose.model('road', {
  title: String,
  overview: [String],
  description: [String],
  keypoints: [String],
});

// Models for 'tools' and 'working' collections
const Tools = mongoose.model('tools', {
  title: String,
  overview: String,
  description: String,
  keypoints: [String],
  imageURL: [String],
});

const Working = mongoose.model('working', {
  title: String,
  overview: String,
  description: String,
  keypoints: [String],
  imageURL: [String],
  videoURL: [String],
});

// Routes for 'tools' and 'working' collections
app.get('/api/tools', async (req, res) => {
  try {
    const toolsData = await Tools.find().lean();
    console.log('Data fetched successfully from "tools" collection:', toolsData);
    res.json(toolsData);
  } catch (error) {
    console.error('Error fetching data from "tools" collection:', error);
    res.status(500).json({ error: 'Error fetching data from "tools" collection' });
  }
});

app.get('/api/working', async (req, res) => {
  try {
    const workingData = await Working.find().lean();
    console.log('Data fetched successfully from "working" collection:', workingData);
    res.json(workingData);
  } catch (error) {
    console.error('Error fetching data from "working" collection:', error);
    res.status(500).json({ error: 'Error fetching data from "working" collection' });
  }
});

// Serving static images and videos
app.use('/api/images', express.static('E:\\Dev Projects\\workREwork\\src\\assets'));
app.use('/api/videos', express.static('E:\\Dev Projects\\workREwork\\src\\assets'));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to My API');
});

// Not Found route
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
app.listen(port, () => {
 console.log(`Backend server is running on port ${port}`);
});
// Listen for MongoDB collection events
mongoose.connection.on('collection', (collectionName) => {
  console.log(`Collection ${collectionName} changed.`);
});
