

//For creating new project
const { exec } = require("child_process");
const client_id = "6d941531c2e642fadf62";
const redirect_uri = "http://localhost:9000/"
const authorize_url = "https://github.com/login/oauth/authorize";

//Create repo
exec("curl -u 'vnlab-test' https://api.github.com/user/repos -d \'{\"name\":\"testRepo\"}\'", (error: any, stdout: any, stderr: any) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);

    //Then, paste presonal acces token
});

export function getAccessToken() : void {
    const Http = new XMLHttpRequest();
    const authorizeEndpoint = buildAuthorizeEndpoint();
    Http.open("GET", authorizeEndpoint);
    Http.send();

    Http.onreadystatechange = e =>  {
        console.log(Http.responseText);
    }

    
}

function buildAuthorizeEndpoint() : string {
    let clientIdParam = "?client_id=" + client_id;
    let redirectUriParam = "&redirect_uri" + redirect_uri;
    return authorize_url + clientIdParam + redirectUriParam;
}
/*import { GitProcess, GitError, IGitResult } from 'dugite'
// Path to folder with project, user has to choose one
// const pathToRepository = 'C:\\Users\\Admin\\Desktop\\temp_file'
const path = 'C:/path/to/repo/'

const options: IGitExecutionOptions = {
  // enable diagnostics
  env: {
    'GIT_HTTP_USER_AGENT': 'dugite/2.12.0',
    'GIT_TRACE': '1',
    'GIT_CURL_VERBOSE': '1'
  },
  processCallback: (process: ChildProcess) => {
    byline(process.stderr).on('data', (chunk: string) => {
      // read line from progress and convert to percentage
    })
  }
}

const result = await GitProcess.exec([ 'push', 'origin', 'master' ], path, options)*/






