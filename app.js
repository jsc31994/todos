const express = require('express');
const cors = require('cors');
const moment = require('moment-timezone');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

function renderHTML(time) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Current Time</title>
      </head>
      <body>
        <p>The current time in Los Angeles is: ${time}</p>
      </body>
    </html>
  `
}

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

app.get('/', (req, res) => {
  res.json(todoData)
})

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
  const currentTimeInLosAngeles = moment().tz('America/Los_Angeles').format('h:mm A');
  res.send(renderHTML(currentTimeInLosAngeles))
})

app.listen(PORT, () => {
  console.log('Server listening on port:', PORT)
})
