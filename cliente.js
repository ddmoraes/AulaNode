const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configurar conexão com o MySQL
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

// Middleware para lidar com dados codificados no corpo da solicitação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/clientes', (req, res) => {
    const sql = 'SELECT * FROM cliente';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar registros: ' + err.message);
            res.status(500).json({ error: 'Erro ao buscar registros' });
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/api/clientes/:email', (req, res) => {
    const { email } = req.params;
    const sql = 'SELECT * FROM cliente where email = ? ';
    connection.query(sql, [email], (err, results) => {
        if (err) {
            
            console.error('Email Inexistente! ');
            res.status(500).json({ error: 'Email Inexistente' });
        } else {
            res.status(201).json(results);
        }
    });
});


app.post('/api/clientes', (req, res) => {

    const { nome, cpf, email, idade } = req.body;
    const sql = 'INSERT INTO cliente (nome, cpf, email, idade) VALUES (?, ?, ?, ?)';
    connection.query(sql, [nome, cpf, email, idade], (err, results) => {
        if (err) {
            console.error('Erro ao inserir registro: ' + err.message);
            res.status(500).json({ error: 'Erro ao inserir registros' });
        } else {
            console.log('Registro inserido com sucesso! ');
            res.status(201).json({ message: 'Registro inserido com sucesso' });
        }
    });
});



app.put('/api/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cpf, email, idade } = req.body;
    const sql = 'UPDATE cliente SET nome =? , cpf =?, email = ?, idade = ? where id = ?';
    connection.query(sql, [nome, cpf, email, idade, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar registro: ' + err.message);
            res.status(500).json({ error: 'Erro ao atualizar registros' });
        } else {
            console.log('Registro atualizado com sucesso! ');
            res.status(201).json({ message: 'Registro atualizado com sucesso' });
        }
    });
});

app.delete('/api/clientes/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM cliente  where id = ?';
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


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});