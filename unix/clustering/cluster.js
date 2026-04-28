// const cluster = require("node:cluster");

// if (cluster.isPrimary) {
//   let requestCount = 0;

//   setInterval(() => {
//     console.log(`Total number of requests: ${requestCount}`);
//   }, 5000);

//   console.log(`This is the parent with PID ${process.pid}.`);

//   const coresCount = require("node:os").availableParallelism();
//   for (let i = 0; i < coresCount; i++) {
//     const worker = cluster.fork();
//     worker.send("some data");
//     console.log(
//       `The parent process spawned a new child process with PID ${worker.process.pid}`
//     );
//   }

//   cluster.on("message", (worker, message) => {
//     if (message.action && message.action === "request") {
//       requestCount++;
//     }
//   });

//   cluster.on("fork", (worker) => {});

//   cluster.on("listening", (worker, address) => {});

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(
//       `Worker ${worker.process.pid} ${signal || code} died. Restarting...`
//     );
//     cluster.fork();
//   });
// } else {
//   require("./server.js");
// }

const cluster = require('node:cluster');
const os = require('node:os');

if (cluster.isPrimary) {
  let requestCount = 0;

  console.log(`Primary process PID: ${process.pid}`);

  // Log request count every 5 seconds
  setInterval(() => {
    console.log(`Total requests handled: ${requestCount}`);
  }, 5000);

  const cores = os.availableParallelism();

  // Spawn workers
  for (let i = 0; i < cores; i++) {
    const worker = cluster.fork();

    worker.send('Hello from parent');

    console.log(`Spawned worker with PID ${worker.process.pid}`);
  }

  // Listen for messages from workers
  cluster.on('message', (worker, message) => {
    if (message.action === 'request') {
      requestCount++;
    }
  });

  // Restart dead workers
  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died (${signal || code}). Restarting...`,
    );
    cluster.fork();
  });
} else {
  // Worker process runs the server
  require('./server');
}