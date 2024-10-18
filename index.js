import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';



const app = express();
app.use(bodyParser.json());

const readData = () =>{
    try {
        const data = fs.readFileSync("db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
    
}

const writeData = (data) =>{
    try {
        fs.writeFileSync('db.json', JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}


app.get('/books', (req, res) =>{
    const data = readData();
    res.json(data.books);
});

app.post('/books', (req, res) =>{
    const data = readData();
    const body = req.body;
    const newBook = {
        id: data.books.lenght +1,
        ...body,
    }
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
});



app.listen(3000, () =>{
    console.log(`Server listening on port ${3000}`);
})