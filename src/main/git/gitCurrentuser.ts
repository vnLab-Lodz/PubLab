import { Octokit } from '@octokit/core';
import axios from 'axios';

export async function getUserData(url : string)
{    
    const response = await axios.get(url);
  
    const { data } = response;
    console.log(data);
    return data;
};

export function getAccessToken (tokenForward: string)
{
    return tokenForward;
};

export async function getUserOctokitData(token: string)
{    
    const octokit = new Octokit({ auth: token});
    const response = await octokit.request("GET /user");
  
 //   const { data } = response;  //full user's data
    const  dataLogin = response.data.login;
    const  dataAvatar = response.data.avatar_url;
    console.log("username: "+dataLogin);
    console.log("avatar url: "+dataAvatar);
    return {dataLogin, dataAvatar};

};
