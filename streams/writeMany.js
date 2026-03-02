// const fs = require('node:fs/promises');

// Execution Time: 8s
// CPU Usage: 100% of the cpu (one core)
// Memory Usage: 51.2MB
// (async () => {
//   console.time('writeMany');
//   const fileHandle = await fs.open('test.txt', 'w');

//   for (let i = 0; i < 1000000; i++) {
//     await fileHandle.write(`${i}`);
//   }
//   console.timeEnd('writeMany');
// })();

// Execution Time: 2s
// CPU Usage: 100% of the cpu (one core)
// Memory Usage: 11.2MB
const fs = require('node:fs');

(async () => {
  console.time('writeMany');
  fs.open('test.txt', 'w', (err, fd) => {
    for (let i = 0; i < 1000000; i++) {
      const buff = Buffer.from(`${i}`, 'utf-8');
      fs.writeSync(fd, buff);
    }
    console.timeEnd('writeMany');
  });
})();
