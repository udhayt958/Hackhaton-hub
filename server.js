const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON data from requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hackathon-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Define the schema for the project data
const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    technologies: String,
    files: [String],
    repoUrl: String,
    demoUrl: String,
    submissionStatus: String,
    deadline: Date,
});

const Project = mongoose.model('Project', projectSchema);

// API endpoint to submit the project
app.post('/submit-project', (req, res) => {
    const projectData = req.body;

    const newProject = new Project(projectData);
    newProject.save()
        .then(() => {
            res.status(200).json({ message: 'Project submitted successfully!' });
        })
        .catch(err => {
            console.error('Error saving project:', err);
            res.status(400).json({ message: 'Project submitted successfully!', error: err });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
