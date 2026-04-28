// const cpeak = require('cpeak');

// const server = new cpeak();

// process.on('message', (message) => {
//   console.log(
//     `Worker ${process.pid} received this message from parent: ${message}`,
//   );
// });

// server.route('get', '/', (req, res) => {
//   process.send({ action: 'request' });

//   res.json({ message: 'This is some text.' });
// });

// server.route('get', '/heavy', (req, res) => {
//   process.send({ action: 'request' });

//   for (let i = 0; i < 10000000000; i++) {}
//   res.json({ message: 'The operation is now done.' });
// });

// const PORT = 5090;

// server.listen(PORT, () => {
//   console.log(`Server has started on port ${PORT}`);
// });

const cpeak = require('cpeak');

const server = new cpeak();

// Handle messages from parent (only exists in cluster mode)
process.on('message', (message) => {
  console.log(`Worker ${process.pid} received: ${message}`);
});

// Helper → safely send message to parent if in worker
function notifyRequest() {
  if (typeof process.send === 'function') {
    process.send({ action: 'request' });
  }
}

// Routes
server.route('get', '/', (req, res) => {
  notifyRequest();

  res.json({ message: 'This is some text.' });
});

server.route('get', '/heavy', (req, res) => {
  notifyRequest();

  // Simulate CPU-heavy task
  for (let i = 0; i < 10_000_000_000; i++) {}

  res.json({ message: 'The operation is now done.' });
});

const PORT = 5090;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (PID: ${process.pid})`);
});