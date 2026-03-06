// const fs = require('node:fs/promises');

// Execution Time: 8s
// CPU Usage: 100% of the cpu (one core)
// Memory Usage: 51.2MB
// (async () => {
//   console.time('writeMany');
//   const fileHandle = await fs.open('text.txt', 'w');

//   for (let i = 0; i < 1000000; i++) {
//     await fileHandle.write(`${i}`);
//   }
//   console.timeEnd('writeMany');
// })();

// const fs = require('node:fs');

// Execution Time: 2s
// CPU Usage: 100% of the cpu (one core)
// Memory Usage: 11.2MB
// (async () => {
//   console.time('writeMany');
//   fs.open('text.txt', 'w', (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       const buff = Buffer.from(`${i}`, 'utf-8');
//       fs.writeSync(fd, buff);
//     }
//     console.timeEnd('writeMany');
//   });
// })();

// const fs = require('node:fs/promises');

// DON'T DO IT THIS WAY!!!
// Execution Time: 230ms
// CPU Usage: 100% of the cpu (one core)
// Memory Usage: 200MB
// (async () => {
//   console.time('writeMany');
//   const fileHandle = await fs.open('text.txt', 'w');

//   const stream = fileHandle.createWriteStream();

//   for (let i = 0; i < 1000000; i++) {
//     const buff = Buffer.from(`${i}`, 'utf-8');
//     stream.write(buff);
//   }
//   console.timeEnd('writeMany');
// })();

const fs = require('node:fs/promises');

// DON'T DO IT THIS WAY!!!
// Execution Time: 230ms
// CPU Usage: 100% of the cpu (one core)
// Memory Usage: 200MB
(async () => {
  console.time('writeMany');
  const fileHandle = await fs.open('text.txt', 'w');

  const stream = fileHandle.createWriteStream();

  console.log(stream.writableHighWaterMark);

  // 8 bits = 1 byte
  // 1000 bytes = 1 kilobyte
  // 1000 kilobytes = 1 megabyte

  // const buff = Buffer.alloc(65535, 10);
  // console.log(stream.write(buff));
  // console.log(stream.write(Buffer.alloc(1, 'a')));
  // console.log(stream.write(Buffer.alloc(1, 'a')));
  // console.log(stream.write(Buffer.alloc(1, 'a')));

  // console.log(stream.writableLength)

  // stream.on('drain', () => {
  //   console.log('We are now safe to write more!');
  //   console.log(stream.write(Buffer.alloc(1, 'a')));
  // });

  // setInterval(() => {}, 1000);
  let i = 0;

  const writeMany = () => {
    while (i < 1000000) {
      const buff = Buffer.from(`${i} `, 'utf-8');

      // this is our last write
      if (i === 999999) {
        return stream.end(buff);
      }

      // id stream.write returns false, stop the loop
      if (!stream.write(buff)) {
        break;
      }

      i++;
    }
  };

  writeMany();

  // resume our loop once our stream's internal buffer is empty
  stream.on('drain', () => {
    console.log('Drained!!!');
    writeMany();
  });

  stream.on('finish', () => {
    console.timeEnd('writeMany');
    fileHandle.close();
  });
})();
