import axios from 'axios';

export async function fetchUserData(token: string) {
  try {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
      },
    });

    const userData = {
      nick: response.data.login,
      avatar: response.data.avatar_url,
      company: response.data.company,
    };

    return userData;
  } catch (error: any) {
    console.error(error.response);
    return undefined;
  }
}
