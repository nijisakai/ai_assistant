const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const adminApp = express();

app.use(cors());
adminApp.use(cors());
app.use(express.json());
adminApp.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
adminApp.use(express.static(path.join(__dirname, 'admin')));

const interactions = [];

// Save interaction data
app.post('/save-interaction', (req, res) => {
    const interactionData = req.body;
    const userId = req.ip; // 使用 IP 作为标识符
    interactionData.userId = userId;
    console.log("Received data from", userId, ":", interactionData);
    interactions.push(interactionData);
    res.json({ success: true });
});

// Export all interactions as CSV with user distinction
adminApp.get('/export', (req, res) => {
    const csvHeader = 'User ID,Sender,Message,Timestamp\n';
    const csvData = interactions.map(interaction =>
        interaction.messages.map(msg =>
            `${interaction.userId},${msg.sender},${msg.message.replace(/,/g, '')},${msg.timestamp}`
        ).join('\n')
    ).join('\n');

    const csvContent = csvHeader + csvData;
    const filePath = path.join(__dirname, 'interactions.csv');
    fs.writeFileSync(filePath, csvContent, 'utf8');
    res.download(filePath, 'interactions.csv');
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
app.listen(3000, '0.0.0.0', () => {
    console.log('Chat interface running at http://0.0.0.0:3000');
});

// Start the admin server
adminApp.listen(3001, '0.0.0.0', () => {
    console.log('Admin interface running at http://0.0.0.0:3001');
});