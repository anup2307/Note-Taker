const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs=require('fs');

notes.get('/', (req, res) => {
    fs.readFile('./db/db.json','utf8',(err,data) =>{
      if(err){ console.error('error in reading file',err)}
      else{
       return res.json(JSON.parse(data))
      }
    })
});

notes.get('/:id', (req, res) => {
    const notesId = req.params.id;
    fs.readFile('./db/db.json','utf8',(err,data) =>{
      if (err)
      { console.error('error in reading file',err)}
      else{
        const parsedNotes= JSON.parse(data)
        const result = parsedNotes.filter((notes) => notes.id !== notesID);
        return result.length > 0
          ? res.json(result)
          : res.json('No notes with that ID');
      }
      });
  });

  notes.post('/', (req, res) => {
    const { title,text } = req.body;
    if (req.body) {
      const newNotes = {
        title,
        text,
        id: uuidv4(),
      };
      fs.readFile('./db/db.json','utf8',(err,data) =>{
        if (err)
        { console.error('error in reading file',err)}
        else{
          const parsedNotes = JSON.parse(data);
          parsedNotes.push(newNotes);
          fs.writeFile('./db/db.json',JSON.stringify(parsedNotes, null, 4),(err) => err? 
                        console.error(err) : res.json(`Notes added successfully 🚀`))
        } 
      })
    }
  });

  notes.delete('/:id', (req,res) => {
    const notesID = req.params.id;
    fs.readFile('./db/db.json','utf8',(err,data) =>{
      if (err)
      { console.error('error in reading file',err)}
      else{
        const parsedData= JSON.parse(data)
        const result = parsedData.filter((notes) => notes.id !== notesID);
        fs.writeFile('./db/db.json',JSON.stringify(result, null, 4),(err) => err? 
        console.error(err) : res.json(`Item ${notesID} has been deleted 🗑️`))       
      }
    });
});

module.exports = notes;