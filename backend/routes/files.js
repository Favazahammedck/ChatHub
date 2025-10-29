const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const fileProcessor = require('../services/fileProcessor');
const { db } = require('../config/firebase');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.txt', '.doc', '.docx'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, TXT, DOC, and DOCX files are allowed.'));
    }
  }
});

// POST /api/files/upload
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Process the file
    const processedData = await fileProcessor.processFile(req.file);

    // Save file metadata to Firebase
    const fileData = {
      id: Date.now().toString(),
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
      uploadedAt: new Date(),
      processedAt: new Date(),
      text: processedData.text,
      metadata: processedData.metadata,
      filePath: req.file.path
    };

    const docRef = await db.collection('files').add(fileData);

    // Clean up the temporary file
    fileProcessor.cleanupFile(req.file.path);

    res.json({
      ...fileData,
      firebaseId: docRef.id
    });

  } catch (error) {
    console.error('File upload error:', error);
    
    // Clean up file if it exists
    if (req.file) {
      fileProcessor.cleanupFile(req.file.path);
    }
    
    res.status(500).json({ error: error.message });
  }
});

// GET /api/files/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const doc = await db.collection('files').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'File not found' });
    }

    const fileData = doc.data();
    res.json(fileData);

  } catch (error) {
    console.error('Get file error:', error);
    res.status(500).json({ error: 'Failed to retrieve file' });
  }
});

// DELETE /api/files/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.collection('files').doc(id).delete();
    
    res.json({ message: 'File deleted successfully' });

  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// GET /api/files
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('files').orderBy('uploadedAt', 'desc').get();
    const files = [];
    
    snapshot.forEach(doc => {
      files.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(files);

  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
});

module.exports = router;

