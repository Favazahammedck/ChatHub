const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

class FileProcessor {
  constructor() {
    this.uploadDir = path.join(__dirname, '../uploads');
    this.ensureUploadDir();
  }

  ensureUploadDir() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async processFile(file) {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    try {
      switch (fileExtension) {
        case '.pdf':
          return await this.processPDF(file);
        case '.txt':
          return await this.processText(file);
        case '.doc':
        case '.docx':
          return await this.processDoc(file);
        default:
          throw new Error(`Unsupported file type: ${fileExtension}`);
      }
    } catch (error) {
      console.error('File processing error:', error);
      throw new Error(`Failed to process file: ${error.message}`);
    }
  }

  async processPDF(file) {
    try {
      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdf(dataBuffer);
      
      return {
        text: data.text,
        pages: data.numpages,
        info: data.info,
        metadata: {
          title: data.info?.Title || file.originalname,
          author: data.info?.Author,
          subject: data.info?.Subject,
          creator: data.info?.Creator,
          producer: data.info?.Producer,
          creationDate: data.info?.CreationDate,
          modificationDate: data.info?.ModDate
        }
      };
    } catch (error) {
      throw new Error(`PDF processing failed: ${error.message}`);
    }
  }

  async processText(file) {
    try {
      const text = fs.readFileSync(file.path, 'utf8');
      return {
        text: text,
        metadata: {
          title: file.originalname,
          size: file.size,
          encoding: 'utf8'
        }
      };
    } catch (error) {
      throw new Error(`Text processing failed: ${error.message}`);
    }
  }

  async processDoc(file) {
    // For now, we'll treat .doc/.docx files as text
    // In a production app, you'd want to use a library like mammoth
    try {
      const text = fs.readFileSync(file.path, 'utf8');
      return {
        text: text,
        metadata: {
          title: file.originalname,
          size: file.size,
          type: 'document'
        }
      };
    } catch (error) {
      throw new Error(`Document processing failed: ${error.message}`);
    }
  }

  extractContext(text, maxLength = 2000) {
    // Extract the most relevant parts of the text for context
    if (text.length <= maxLength) {
      return text;
    }

    // Try to find sentences that might be more relevant
    const sentences = text.split(/[.!?]+/);
    let context = '';
    
    for (const sentence of sentences) {
      if (context.length + sentence.length <= maxLength) {
        context += sentence + '. ';
      } else {
        break;
      }
    }

    return context.trim();
  }

  cleanupFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error cleaning up file:', error);
    }
  }
}

module.exports = new FileProcessor();

