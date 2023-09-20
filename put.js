const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


let books = [
    {id: 1, title: 'Livro 1 '},
    {id: 2, title: 'Livro 2 '},
    {id: 3, title: 'Livro  3'},
];

app.put('/update-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const newTitle = req.body.title;
   const bookToUpdate = books.find(book => book.id === bookId);

   if (bookToUpdate) {
    bookToUpdate.title = newTitle;
    res.json(bookToUpdate);
   } else {
    res.status(404).send('Livro não encontrado');
   }c
});



app.listen(port, () => {
    console.log('Servidor rodando em http/localhost:$(port)');
});