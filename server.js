const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 8000;

// MySQL database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your mysql user
    password: '', // your mysql password
    database: 'studentdb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

app.use(bodyParser.json());
app.use(express.static('public'));

// API to fetch all students
app.get('/students', (req, res) => {
    connection.query('SELECT * FROM students', (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});
// API to fetch marks of a specific student by name
app.get('/students/marks', (req, res) => {
    const { name } = req.query;
    connection.query('SELECT marks FROM students WHERE name = ?', [name], (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Student not found');
        }
    });
});


// API to add a new student
app.post('/students', (req, res) => {
    const { name, marks } = req.body;
    connection.query('INSERT INTO students (name, marks) VALUES (?, ?)', [name, marks], (error, results, fields) => {
        if (error) throw error;
        res.status(201).send('Student added');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});