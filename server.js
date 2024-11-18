const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const adminApp = express();

app.use(express.json());
adminApp.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
adminApp.use(express.static(path.join(__dirname, 'admin')));

const interactions = [];

// Save interaction data
app.post('/save-interaction', (req, res) => {
    const interactionData = req.body;
    console.log("Received data:", interactionData); // for debugging
    interactions.push(interactionData);
    res.json({ success: true });
});

// Export interactions as CSV
adminApp.get('/export', (req, res) => {
    const csvHeader = 'Sender,Message,Timestamp\n';
    const csvData = interactions.map(interaction =>
        interaction.messages.map(msg =>
            `${msg.sender},${msg.message.replace(/,/g, '')},${msg.timestamp}`
        ).join('\n')
    ).join('\n\n');
    
    const csvContent = csvHeader + csvData;
    fs.writeFileSync('interactions.csv', csvContent, 'utf8');
    res.download(path.join(__dirname, 'interactions.csv'), 'interactions.csv');
});

// Serve the chat interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Serve the admin interface
adminApp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'admin.html'));
});

// Start the chat server
app.listen(3000, () => {
    console.log('Chat interface running at http://localhost:3000');
});

// Start the admin server
adminApp.listen(3001, () => {
    console.log('Admin interface running at http://localhost:3001');
});