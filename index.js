const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/message', (req, res) => {
  const userMessage = req.body.message;

  exec(`python3 generate_response.py "${userMessage}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ response: 'There was an error generating the story.' });
    }

    res.json({ response: stdout.trim() });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
