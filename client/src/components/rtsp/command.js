/*const execFile = require('child_process').execFile;

export const executeCommand = () => {
  execFile('.\node_modules\.bin\nodemon .\hls-server.js', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
     
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      
      return;
    }
    console.log(`stdout: ${stdout}`);
    
  });
}; */

/*const {spawn} = require('child_process');

  const myChildProcess = spawn('pwd');

  myChildProcess.stdout.on('data', (msg) => {
    console.log(msg);
  });

  myChildProcess.stderr.on('data', (msg) => {
    console.log(msg);
  });

  myChildProcess.on('close', (msg) => {
    console.log(msg);
  })*/

