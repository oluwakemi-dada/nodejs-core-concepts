const fs = require('fs/promises');

(async () => {
  const commandFileHandler = await fs.open('./command.txt', 'r');

  commandFileHandler.on('change', async () => {
    // Get the size of our file and allocate buffer
    const size = (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);

    const offset = 0; // Location at which to start filling our buffer
    const length = buff.byteLength; // Bytes to read

    const position = 0; // Position to start reading the file from

    // We want to read the content
    await commandFileHandler.read(buff, offset, length, position);

    console.log(buff.toString('utf-8'));
  });

  // Watcher
  const watcher = fs.watch('./command.txt');
  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
})();
