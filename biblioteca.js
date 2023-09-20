const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'alunos_ninho_t'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL: ' + err.message);
    } else {
        console.log('Conectado ao MySQL');
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuario';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar registros: ' + err.message);
            res.status(500).json({ error: 'Erro ao buscar registros' });
        } else {
            res.status(200).json(results);
        }
    });
});


app.post('/api/usuarios1', (req, res) => {

    const { email, senha } = req.body;
    const sql = 'INSERT INTO usuario (email, senha) VALUES (?, ?)';
    connection.query(sql, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao inserir registro: ' + err.message);
            res.status(500).json({ error: 'Erro ao inserir registros' });
        } else {
            console.log('Registro inserido com sucesso! ');
            res.status(201).json({ message: 'Registro inserido com sucesso' });
        }
    });
});



app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { email, senha } = req.body;
    const sql = 'UPDATE usuario SET email = ?, senha = ? where id = ?';
    connection.query(sql, [email, senha, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar registro: ' + err.message);
            res.status(500).json({ error: 'Erro ao atualizar registros' });
        } else {
            console.log('Registro atualizado com sucesso! ');
            res.status(201).json({ message: 'Registro atualizado com sucesso' });
        }
    });
});

app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM usuario  where id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao excluir registro: ' + err.message);
            res.status(500).json({ error: 'Erro ao excluir registros' });
        } else {
            console.log('Registro excluido com sucesso! ');
            res.status(201).json({ message: 'Registro excluido com sucesso' });
        }
    });
});



app.listen(port, () => {
    console.log('Servidor iniciado na porta ${port}');
});

