const express = require('express');
const path = require ('path');
const api = require('./routes/index');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3002;
const app = express();

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.get('/',(req,res) => 
  res.sendFile(path.join(__dirname,'public/index.html'))
)

app.get('/notes',(req,res) => 
    res.sendFile(path.join(__dirname,'public/notes.html'))
)

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);