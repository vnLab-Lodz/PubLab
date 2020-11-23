import {GitProcess, IGitExecutionOptions} from 'dugite'
import axios, {AxiosResponse} from 'axios'
import {ChildProcess} from "child_process";

const client_id = "6d941531c2e642fadf62";
const client_secret = "1100c9fb26028bb083b029e84248312a57066b84 ";
const redirect_uri = "http://localhost:3000/main_window"
const authorize_url = "https://github.com/login/oauth/authorize";
const access_token_url = "https://github.com/login/oauth/access_token";

export function authorizeWithGithub() : void {
    axios.get(buildAuthorizeEndpoint()).then(data => {
        console.log(document.location.href);
        document.location.href = data.config.url;
    });
}

export async function postAccessToken(codeParam : string) : Promise<AxiosResponse> {
    return await axios.post(buildAccessTokenEndpoint(codeParam)).then(data => {
        var search = data.data.substring(0);
        const result = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
        return result.access_token;
    });
}

export function createNewRepository(accessToken: string, repoName: string, description?: string):  void{
    axios({
        method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': 'token ' + accessToken
         },
         url: "https://api.github.com/user/repos",
         data: {
            "name": repoName,
            "description": description,
            "homepage": "https://github.com",
            "private": true,
            "has_issues": true,
            "has_projects": true,
            "has_wiki": true
        }
    }).then(data => {
        console.log(data);
    });
}

export interface Repository {
    name: string,
    author: string,
    url: string
}

/**
 * return array of objects with name of repository, author of repository and url to repository
 **/
export function getUserRepositories(accessToken: string): Repository[] {
    const repositories: Repository[] = []
    axios({
        method: 'GET',
        headers: {
            'Authorization': 'token ' + accessToken
        },
        url: "https://api.github.com/user/repos",
    }).then(data => {
        console.log(data)
        data.data.forEach((repo: any) => {
            repositories.push({name: repo.name, author: repo.owner.login, url: repo.url} as Repository)
        })
        console.log(repositories)
    });
    return repositories;
}

function buildAuthorizeEndpoint() : string {
    let clientIdParam = "?client_id=" + client_id;
    let redirectUriParam = "&redirect_uri=" + redirect_uri;
    return authorize_url + clientIdParam + redirectUriParam;
}

function buildAccessTokenEndpoint(codeParam : string) : string {
    let clientIdParam = "&client_id=" + client_id;
    let clientSecretParam = "&client_secret=" + client_secret;
    return access_token_url + codeParam + clientIdParam + clientSecretParam;

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



/////////////////////////////////////////////////////////////////////
//CLONE
const byline = require('byline')
const ProgressBar = require('progress')

const progressBarOptions = {
    complete: '=',
    incomplete: ' ',
    width: 50,
    total: 100
}

function tryParse(str: string): number | null {
    const value = /(\d+)\%/.exec(str)
    if (value) {
        const percentValue = value[1]
        const percent = parseInt(percentValue, 10)
        if (!isNaN(percent)) {
            return percent
        }
    }

    return null
}

let receivingObjectsBar: any = null
function setReceivingProgress(percent: number) {
    if (!receivingObjectsBar) {
        receivingObjectsBar = new ProgressBar('Receiving objects [:bar] :percent', progressBarOptions)
    }

    receivingObjectsBar.update(percent / 100)
}

let resolvingDeltasBar: any = null
function setResolvingProgress(percent: number) {
    if (!resolvingDeltasBar) {
        resolvingDeltasBar = new ProgressBar('Resolving deltas [:bar] :percent', progressBarOptions)
    }

    resolvingDeltasBar.update(percent / 100)
}


export async function performClone(): Promise<void> {
    const path = 'C:/Users/jedre/Desktop'

    const options: IGitExecutionOptions = {
        // enable diagnostics
        env: {
            GIT_HTTP_USER_AGENT: 'dugite/2.12.0'
        },
        processCallback: (process: ChildProcess) => {
            byline(process.stderr).on('data', (chunk: string) => {
                if (chunk.startsWith('Receiving objects: ')) {
                    const percent = tryParse(chunk)
                    if (percent) {
                        setReceivingProgress(percent)
                    }
                    return
                }

                if (chunk.startsWith('Resolving deltas: ')) {
                    const percent = tryParse(chunk)
                    if (percent) {
                        setResolvingProgress(percent)
                    }
                    return
                }
            })
        }
    }
    const result = await GitProcess.exec(
        ['clone', 'https://github.com/jedrekszor/vnlab-test', '--progress'],
        path,
        options
    )
    if (result.exitCode !== 0) {
        console.log(`Unable to clone, exit code ${result.exitCode}`)
        console.log(result.stderr)
    } else {
        console.log('Clone completed')
    }
}
