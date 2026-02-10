const { Buffer } = require('buffer');

const buffer = Buffer.alloc(10000);

const unsafeBuffer = Buffer.allocUnsafe(10000);

for (let i = 0; i < buffer.length; i++) {
  if (buffer[i] !== 0) {
    console.log(
      `Element at position ${i} has value: ${buffer[i].toString(2)}`,
    );
  }
}
