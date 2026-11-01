import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Serve static assets from dist with explicit avif MIME type
express.static.mime.define({ 'image/avif': ['avif'] });

app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.avif')) {
      res.setHeader('Content-Type', 'image/avif');
    }
  }
}));

// SPA fallback: return index.html for all non-asset routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Innoanswers-Site production server running on http://${HOST}:${PORT}`);
});
