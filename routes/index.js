const express = require('express');
const router = express.Router();
const escape = require('escape-html');

// Sample messages array
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// Index route
router.get('/', (req, res) => {
  res.render('index', { 
    title: "Mini Messageboard", 
    messages: messages 
  });
});

// New message form route
router.get('/new', (req, res) => {
  res.render('form', { title: "New Message" });
});

// Individual message route
router.get('/message/:id', (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages[messageId];
  
  if (!message) {
    return res.redirect('/');
  }
  
  res.render('message', { 
    title: "Message Details",
    message,
    messageId
  });
});

// Handle new message submission
router.post('/new', (req, res) => {
  const messageText = escape(req.body.messageText || '');
  const messageUser = escape(req.body.messageUser || '');
  
  // Basic validation
  if (!messageText.trim() || !messageUser.trim()) {
    return res.status(400).send('Message and user name are required');
  }
  
  messages.push({ 
    text: messageText, 
    user: messageUser, 
    added: new Date() 
  });
  
  res.redirect('/');
});

// Delete message route
router.post('/message/:id/delete', (req, res) => {
  const messageId = parseInt(req.params.id);
  
  if (messageId >= 0 && messageId < messages.length) {
    messages.splice(messageId, 1);
  }
  
  res.redirect('/');
});

module.exports = router;