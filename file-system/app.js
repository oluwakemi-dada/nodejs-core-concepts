const fs = require('fs/promises');

(async () => {
  const commandFileHandler = await fs.open('./command.txt', 'r');

  const watcher = fs.watch('./command.txt');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      // The file was changed
      console.log('The file was changed');

      // Get the size of our file
      const size = (await commandFileHandler.stat()).size;
      const buff = Buffer.alloc(size);

      const offset = 0;
      const length = buff.byteLength;
      const position = 0;

      // We want to read the content
      const content = await commandFileHandler.read(
        buff,
        offset,
        length,
        position,
      );
      console.log("Content",content);
    }
  }
})();
