const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let tarefas = [];
let idCounter = 1;

app.get('/tarefas', (req, res) => {
    const { status } = req.query; 
  
    if (status === 'true') {
      return res.json(tarefas.filter(tarefa => tarefa.status === true));
    } else if (status === 'false') {
      return res.json(tarefas.filter(tarefa => tarefa.status === false));
    }
  
    res.json(tarefas);
  });

app.post('/tarefas', (req, res) => {
  const { nome } = req.body;
  const novaTarefa = { id: idCounter++, nome, status: false };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { nome, status } = req.body;
  const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id === parseInt(id));

  if (tarefaIndex === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  tarefas[tarefaIndex] = { id: parseInt(id), nome, status };
  res.json(tarefas[tarefaIndex]);
});

app.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id === parseInt(id));

  if (tarefaIndex === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  tarefas.splice(tarefaIndex, 1);
  res.status(204).end();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
