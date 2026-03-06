const { pipeline } = require('node:stream');
const fs = require('node:fs/promises');

// File Size Copied: 889MB
// Memory Usage: 862.4MB
// Execution Time: 411.335ms
// (async () => {
//   console.time('copy');

//   const destFile = await fs.open('text-copy.txt', 'w');
//   const result = await fs.readFile('text-big.txt');

//   await destFile.write(result);
//   console.log(result);

//   console.timeEnd('copy');
// })();

// File Size Copied: 889MB
// Memory Usage: 23.4MB
// Execution Time: 1.213s
// (async () => {
//   console.time('copy');

//   const srcFile = await fs.open('text-big.txt', 'r');
//   const destFile = await fs.open('text-copy.txt', 'w');

//   let bytesRead = -1;

//   while (bytesRead !== 0) {
//     const readResult = await srcFile.read();
//     bytesRead = readResult.bytesRead;

//     if (bytesRead !== 16384) {
//       const indexOfNotFilled = readResult.buffer.indexOf(0);
//       const newBuffer = Buffer.alloc(indexOfNotFilled);
//       readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
//       destFile.write(newBuffer);
//     } else {
//       destFile.write(readResult.buffer);
//     }
//   }

//   console.timeEnd('copy');
// })();

// File Size Copied: 889MB
// Memory Usage: 24.9MB
// Execution Time: 519.529ms
(async () => {
  console.time('copy');

  const srcFile = await fs.open('text-big.txt', 'r');
  const destFile = await fs.open('text-copy.txt', 'w');

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  // readStream.pipe(writeStream);

  // readStream.on('end', () => {
  //   console.timeEnd('copy');
  // });

  pipeline(readStream, writeStream, (err) => {
    console.log(err);
    console.timeEnd('copy');
  });
})();
