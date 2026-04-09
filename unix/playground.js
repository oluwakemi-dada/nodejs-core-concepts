const { spawn, exec } = require('node:child_process');
const { stdin, stdout, stderr } = require('node:process');

stdin.on('data', (data) => {
  // console.log('Got this data from standard in: ', data.toString('utf-8'));
  stdout.write(`Got this data from standard in: ${data.toString('utf-8')}\n`);
});

stdout.write('This is some text that i want.');

stderr.write('This is some text that i may not want.');

// ---- Process variables
// console.log(process.env.PATH);
// console.log(process.argv);
// console.log(process.pid);

// ---- Spawning a process
// const subprocess = spawn('/Applications/Postman.app/Contents/MacOS/Postman');
// // const subprocess = spawn('open', ['-a', 'Notes']);

// subprocess.stdout.on('data', (data) => {
//   console.log(data.toString('utf-8'));
// });

// exec("echo 'something string' | tr ' ' '\n'", (error, stdout, stderr) => {
//   if (error) {
//     console.error(console.error());
//     return;
//   }

//   console.log(stdout);

//   console.log(`stderr: ${stderr}`);
// });
