const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend to be implemented later' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
