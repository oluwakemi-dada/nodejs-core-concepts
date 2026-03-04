const fs = require('node:fs/promises');

(async () => {
  const fileHandleRead = await fs.open('src.txt', 'r');
  const fileHandleWrite = await fs.open('dest.txt', 'w');

  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const streamWrite = fileHandleWrite.createWriteStream();

  streamRead.on('data', (chunk) => {
    if (!streamWrite.write(chunk)) {
      streamRead.pause();
    }

    streamWrite.on('drain', () => {
      streamRead.resume();
    });
  });
})();
