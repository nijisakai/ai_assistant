# Chat Assistant Project

## Overview

This project provides a chat assistant interface that collects and stores user interactions. It includes a frontend user chat interface and a backend admin interface for exporting chat data to a CSV file.

## Project Structure

```
/project-root
│-- /public
│   └-- chat.html
│-- /admin
│   └-- admin.html
└-- server.js
```

## Features

- **User Interface**: Accessible at `http://localhost:3000`.
- **Admin Interface**: Accessible at `http://localhost:3001`.
- **Data Storage**: Captures user interactions with timestamps and messages.
- **CSV Export**: Admin can export all interactions to a CSV file.

## Setup and Usage

1. **Install Node.js & npm**: Make sure Node.js and npm are installed.

2. **Clone the Repository**: Download or clone the project files.

3. **Install Dependencies**:
   ```bash
   npm install express cors
   ```

4. **Run the Servers**:
   ```bash
   node server.js
   ```

5. **Access Interfaces**:
   - User Interface: [http://localhost:3000](http://localhost:3000)
   - Admin Interface: [http://localhost:3001](http://localhost:3001)

6. **Export Data**:
   - Go to the Admin Interface and click "Export Interactions" to download the CSV file.

## Notes

- Replace `'YOUR_JWT_TOKEN'` with your actual JWT token in `chat.html`.
- Ensure the API endpoint URL in `chat.html` is accessible.

## Troubleshooting

- **Empty CSV**: Ensure interaction data is sent upon closing the chat or browser.
- **Network Issues**: Check console logs for network errors.
- **UTF-8 Encoding**: Ensure CSV writes with UTF-8 to prevent text encoding issues.
