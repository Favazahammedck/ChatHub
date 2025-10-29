const express = require('express');
const router = express.Router();
const openaiService = require('../services/openai');
const { db } = require('../config/firebase');

// POST /api/chat/message
router.post('/message', async (req, res) => {
  try {
    const { message, sessionId, context } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: 'Message and sessionId are required' });
    }

    // Generate AI response
    const messages = [
      { role: 'user', content: message }
    ];

    const aiResponse = await openaiService.generateResponse(messages, context);

    // Save message to Firebase
    const messageData = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      sessionId
    };

    const aiMessageData = {
      id: (Date.now() + 1).toString(),
      content: aiResponse,
      sender: 'ai',
      timestamp: new Date(),
      sessionId,
      aiModel: 'chatgpt'
    };

    // Save to Firebase
    await db.collection('messages').add(messageData);
    await db.collection('messages').add(aiMessageData);

    res.json({
      userMessage: messageData,
      aiMessage: aiMessageData
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// POST /api/chat/summarize
router.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const summary = await openaiService.generateSummary(text);

    res.json({ summary });

  } catch (error) {
    console.error('Summarize error:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

// POST /api/chat/flashcards
router.post('/flashcards', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const flashcards = await openaiService.generateFlashcards(text);

    res.json({ flashcards });

  } catch (error) {
    console.error('Flashcards error:', error);
    res.status(500).json({ error: 'Failed to generate flashcards' });
  }
});

module.exports = router;

