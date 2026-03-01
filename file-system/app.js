const fs = require('fs/promises');

(async () => {
  // Commands
  const CREATE_FILE = 'create a file';
  const DELETE_FILE = 'delete the file';
  const RENAME_FILE = 'rename the file';
  const ADD_TO_FILE = 'add to the file';

  const createFile = async (path) => {
    try {
      // check if file exist
      let existingFileHandle = await fs.open(path, 'r');
      existingFileHandle.close();
      return console.log(`The file ${path} already exists`);
    } catch (error) {
      // create file
      const newFileHandle = await fs.open(path, 'w');
      console.log('A new file was successfully created.');
      newFileHandle.close();
    }
  };

  const deleteFile = async (path) => {
    try {
      await fs.unlink(path);
      console.log('The file was successfully removed');
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('No file at this path to remove');
      } else {
        console.log('An error occurred while removing the file');
        console.log(error);
      }
    }
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log('The file was successfully renamed');
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(
          "No file at this path to rename, or the destination doesn't exist",
        );
      } else {
        console.log('An error occurred while removing the file');
        console.log(error);
      }
    }
  };

  const addToFile = async (path, content) => {
    console.log(`Adding to ${path}`);
    console.log(`Content: ${content}`);
  };

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

    const command = buff.toString('utf-8');

    // Create a file:
    // Create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // Delete a file
    // delete the file <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // Rename file:
    // rename the file <path> to <new-path>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(' to ');
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4);

      renameFile(oldFilePath, newFilePath);
    }

    //  Add to file:
    // add to the file <path> with content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(' this content: ');
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);

      addToFile(filePath, content);
    }
  });

  // Watcher
  const watcher = fs.watch('./command.txt');
  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
})();
