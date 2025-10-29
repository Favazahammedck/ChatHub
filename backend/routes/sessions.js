const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// POST /api/sessions
router.post('/', async (req, res) => {
  try {
    const { title, userId } = req.body;

    const sessionData = {
      title: title || 'New Chat',
      userId: userId || 'anonymous',
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: 0,
      lastMessage: '',
      isActive: true
    };

    const docRef = await db.collection('sessions').add(sessionData);

    res.json({
      id: docRef.id,
      ...sessionData
    });

  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// GET /api/sessions
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    
    let query = db.collection('sessions').orderBy('updatedAt', 'desc');
    
    if (userId) {
      query = query.where('userId', '==', userId);
    }

    const snapshot = await query.get();
    const sessions = [];
    
    snapshot.forEach(doc => {
      sessions.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(sessions);

  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ error: 'Failed to retrieve sessions' });
  }
});

// GET /api/sessions/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const doc = await db.collection('sessions').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const sessionData = doc.data();
    res.json({
      id: doc.id,
      ...sessionData
    });

  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({ error: 'Failed to retrieve session' });
  }
});

// GET /api/sessions/:id/messages
router.get('/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    
    const snapshot = await db.collection('messages')
      .where('sessionId', '==', id)
      .orderBy('timestamp', 'asc')
      .get();
    
    const messages = [];
    snapshot.forEach(doc => {
      messages.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(messages);

  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// PUT /api/sessions/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    updates.updatedAt = new Date();
    
    await db.collection('sessions').doc(id).update(updates);
    
    const doc = await db.collection('sessions').doc(id).get();
    const sessionData = doc.data();
    
    res.json({
      id: doc.id,
      ...sessionData
    });

  } catch (error) {
    console.error('Update session error:', error);
    res.status(500).json({ error: 'Failed to update session' });
  }
});

// DELETE /api/sessions/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete all messages in the session
    const messagesSnapshot = await db.collection('messages')
      .where('sessionId', '==', id)
      .get();
    
    const batch = db.batch();
    messagesSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    
    // Delete the session
    await db.collection('sessions').doc(id).delete();
    
    res.json({ message: 'Session deleted successfully' });

  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({ error: 'Failed to delete session' });
  }
});

module.exports = router;

