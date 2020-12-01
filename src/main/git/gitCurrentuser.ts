import { Octokit } from '@octokit/core';

export async function getUserOctokitData(token: string)
{    
    const octokit = new Octokit({ auth: token});
    const response = await octokit.request("GET /user");
  
    const  login = response.data.login;
    const  avatar = response.data.avatar_url;
    const  company = response.data.company;
    console.log("username: " + login);
    console.log("avatar url: " + avatar);
    console.log("company: " + company);
    return {login, avatar, company};
};