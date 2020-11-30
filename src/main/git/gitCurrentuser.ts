import { Octokit } from '@octokit/core';
import axios from 'axios';

export async function getUserData(url : string)
{    
    const response = await axios.get(url);
  
    const { data } = response;
    console.log(data);
    return data;
}

export async function getUserOctokitData(token: string)
{    
    const octokit = new Octokit({ auth:  token});
    const response = await octokit.request("GET /user", {
        org: "octokit",
        type: "private",
      });
  
    const { data } = response;
    console.log(data);
    return data;
}

