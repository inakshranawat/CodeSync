# CodeSync

This application enables multiple users to write and edit code together in real time. Built with React on the frontend, Node.js alongside Express on the backend, and powered by WebSockets (via libraries like ws or socket.io), it delivers instantaneous synchronization, ensuring seamless collaboration.

Core Features

Instant Code Sync: As one user types or edits, changes are broadcasted via WebSocket and reflected live on all connected clients.

Syntax Highlighting & UI Enhancements: Integration with CodeMirror or similar libraries enables syntax highlighting, cursor tracking, theme options, and clean UX design 


Auto-Save / State Preservation: Backend can maintain current code state to support session continuity or reconnections.

Tech Architecture
Backend (Node.js + Express + WebSocket)

Setup: Express serves static files and/or client bundle; WebSocket server (via ws or socket.io) attaches to the same HTTP server to manage real-time data flow 

.

Data Flow:

On connection: send initial document state to the client.

On client edits: messages are broadcasted to other clients to update their views 
DEV Community
.

Frontend (React + WebSocket)

WebSocket Integration: Use native WebSocket or libraries like react-use-websocket / socket.io-client within React to manage connection, events, and life cycle 
LogRocket Blog

Editor Embedding: MoracoEditor (or similar) integrated with React components to allow editing and listening to change events. Incoming messages from the WebSocket update the editor’s state in real time

