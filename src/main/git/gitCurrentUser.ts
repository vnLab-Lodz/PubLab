import axios from 'axios';
import { appendLog } from '../logger';

export async function fetchUserData(token: string) {
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
      },
    });

    return {
      nick: response.data.login,
      avatar: response.data.avatar_url,
      company: response.data.company,
    };
  } catch (error: any) {
    appendLog(error.response);
    return undefined;
  }
}
