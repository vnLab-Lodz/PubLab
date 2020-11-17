import { exec } from 'child_process';

function checkForGatsby(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    exec('npm list -g gatsby-cli --json', (error, stdout, stderr) => {
      if (error && stdout === '{}') reject(error);

      let resultObj: any = JSON.parse(stdout);

      if (Object.keys(resultObj).length === 0 && resultObj.constructor === Object) resolve(false);
      else resolve(true);
    });
  });
}

export function installGatsby(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    checkForGatsby().then(
      (value) => {
        if (value) {
          console.info('gatsby-cli is already installed');
          resolve();
        } else {
          console.info('gatsby-cli not installed. Installing...');
          exec('npm install -g gatsby-cli --quiet', (error, stdout, stderr) => {
            if (error) reject(error);

            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            console.info('Finished installation of gatsby-cli');
            resolve();
          });
        }
      },
      (reason) => reject(reason)
    );
  });
}
