// Create web server
// Import express module
const express = require('express');
// Import body-parser module
const bodyParser = require('body-parser');
// Import comments module
const comments = require('./comments');
// Set up app
const app = express();
// Use body-parser to parse JSON
app.use(bodyParser.json());
// Set up port
const port = 4001;
// Set up server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
// Get comments
app.get('/comments', (req, res) => {
  res.send(comments.getComments());
});
// Post comments
app.post('/comments', (req, res) => {
  const comment = req.body.comment;
  const username = req.body.username;
  comments.addComment(comment, username);
  res.send(comments.getComments());
});
// Put comments
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = req.body.comment;
  comments.updateComment(parseInt(id), comment);
  res.send(comments.getComments());
});
// Delete comments
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  comments.deleteComment(parseInt(id));
  res.send(comments.getComments());
});

// Path: comments.js
// Define comments array
const comments = [
  {
    id: 1,
    username: 'alice',
    comment: 'I love cheese'
  },
  {
    id: 2,
    username: 'bob',
    comment: 'I love wine'
  }
];
// Get comments
const getComments = () => {
  return comments;
};
// Add comment
const addComment = (comment, username) => {
  const id = comments.length + 1;
  comments.push({ id, comment, username });
};
// Update comment
const updateComment = (id, comment) => {
  const index = comments.findIndex(c => c.id === id);
  comments[index].comment = comment;
};
// Delete comment
const deleteComment = id => {
  const index = comments.findIndex(c => c.id === id);
  comments.splice(index, 1);
};
// Export comments
module.exports = {
  getComments,
  addComment,
  updateComment,
  deleteComment
};

// Path: comments.test.js
// Import comments module
// Test get