const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const todoData = {
  todoItems: [
    {
      title: 'Task 1',
      description: 'Detailed Task 1 Description',
      status: 'IN_PROGRESS',
      assignedUser: 'userId1'
    },
    {
      title: 'Task 2',
      description: 'Detailed Task 2 Description',
      status: 'DONE'
    },
    {
      title: 'Task 3',
      description: 'Detailed Task 3 Description',
      status: 'TO_DO',
      assignedUser: 'userId2'
    }
  ]
}

const users = {
  userId1: { id: 'userId1', firstName: 'Josh', lastName: 'Nichols' },
  userId2: { id: 'userId2', firstName: 'Arthur', lastName: 'Reed' }
}

app.get('/users/:id', (req, res) => {
  const userID = req.params.id
  const user = users[userID];

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'user not found'})
  }
})

app.get('/time', (req, res) => {
  fs.readFile(__dirname + '/public/index.html', 'utf8', (err, html) => {
    if (err) {
      res.status(500).send('Error reading HTML file');
      return;
    }

    res.send(html);
  })
})

app.get('/', (req, res) => {
  res.json(todoData)
})

app.listen(PORT, () => {
  console.log('Server listening on port:', PORT)
})
