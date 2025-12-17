import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// The 'process' global is automatically available in Node.js environments
// when @types/node is installed and configured in jsconfig.json.
// No explicit declaration is needed here.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || "5000"); // Correctly parse PORT from environment variable

// Serve static files from the assets/pdfs directory specifically
app.use('/assets/pdfs', express.static(path.join(__dirname, '../assets/pdfs')));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// Route all requests to serve appropriate HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../login.html'));
});

app.get('/demo', (req, res) => {
  res.sendFile(path.join(__dirname, '../demo.html'));
});

app.get('/past-papers', (req, res) => {
  res.sendFile(path.join(__dirname, '../past-papers.html'));
});

app.get('/multi-learn', (req, res) => {
  res.sendFile(path.join(__dirname, '../multi-learn.html'));
});

app.get('/videos', (req, res) => {
  res.sendFile(path.join(__dirname, '../videos.html'));
});

app.get('/exam-questions', (req, res) => {
  res.sendFile(path.join(__dirname, '../exam-questions.html'));
});

app.get('/quick-learn', (req, res) => {
  res.sendFile(path.join(__dirname, '../quick-learn.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../notes.html'));
});

app.get('/progress', (req, res) => {
  res.sendFile(path.join(__dirname, '../progress.html'));
});

// Handle all other routes by serving index.html (for client-side routing fallback)
app.get('*', (req, res) => {
  console.log(`Catch-all route hit for: ${req.path}`); // Log requests hitting this route
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Physics Pro static server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});

export default app;