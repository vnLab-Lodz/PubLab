import {EndPointParameters, ScopeParamValues, Url} from "./gitTypes";
import axios from 'axios';
import { BrowserWindow, session } from 'electron';
import { appendLog } from '../logger';

/**
 * Authorizes GitHub user within an external window
 * @param callback function that is to be executed on authorization success
 */
export function authorizeWithGithub(
  silent: boolean,
  callback: (response: { code: string; error: any }) => void
): void {
  const authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: { nodeIntegration: false },
  });

  authWindow.loadURL(
    `${Url.AUTHORIZE_URL}?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${Url.REDIRECT_URI}&scope=user%20repo`
  );

  if (!silent) {
    authWindow.show();
  } else {
    authWindow.webContents.on('did-finish-load', () => {
      setTimeout(() => {
        authWindow.close();
        callback({ code: null, error: null });
      }, 1000);
    });
  }

  const processRedirect = (url: any) => {
    const rawCode = /code=([^&]*)/.exec(url) || null;
    const code = rawCode && rawCode.length > 1 ? rawCode[1] : null;
    const error = /\?error=(.+)$/.exec(url);

    if (code || error) authWindow.close();

    callback({ code, error });
  };

  authWindow.webContents.on('will-navigate', (_event: any, url: any) => {
    processRedirect(url);
  });

  authWindow.webContents.on('will-redirect', (_event: any, url: any) => {
    processRedirect(url);
  });
}

/**
 * Requests access_token from GitHub API.
 * @param code code received from GitHub API authorization
 * @returns object with access_token info or object with error
 */
export async function requestAccessToken(code: string): Promise<any> {
  try {
    const response = await axios.post(
      Url.ACCESS_TOKEN_URL,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    const { data } = response;
    return data;
  } catch (error) {
    appendLog(
      `GitHub auth failed with ${error.response.statusText} (${error.response.status})`
    );
    appendLog('Check if environmental variables are correctly set up.');
    appendLog('Request:');
    appendLog(JSON.stringify(error.response));
  }
}

export const terminateSession = async (): Promise<void> => {
  await session.defaultSession.clearStorageData();
};
