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

app.delete('/delete-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
  indexToRemove = books.findIndex(book => book.id === bookId);

   if (IndexToRemove !== -1) {
    const removedBook = books.splice(indexToRemove, 1);
    res.json(removedBook[0]);
   } else {
    res.status(404).send('Livro não encontrado');
   }c
});



app.listen(port, () => {
    console.log('Servidor rodando em http/localhost:$(port)');
});