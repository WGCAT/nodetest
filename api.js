const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
  });

app.use(express.json());

// GET
app.get('/books', (req, res) => {
    db.query('SELECT * FROM books');
  });

// POST
app.post('/books', (req, res) => {
    const { name, description } = req.body;
    db.query(
      'INSERT INTO books (name, description) VALUES (?, ?)',
      [name, description]
    );
  });

// PUT
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.query(
      'UPDATE books SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
  });

// DELETE
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM books WHERE id = ?', [id]);
  });

  app.listen(port, () => {
    console.log(`Start Server : localhost:3000`);
  });