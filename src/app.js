const express = require('express');
const reportRoutes = require('./routes/reportRoutes');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', reportRoutes);

app.get('/download/:filename', (req, res) => {
  const filePath = path.resolve(__dirname, '../generated_reports', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
