import axios, {AxiosResponse} from 'axios'
import {EndPointParameters, ScopeParamValues, Url} from "./gitTypes";

export function authorizeWithGithub() : void {
    axios.get(buildAuthorizeEndpoint()).then(data => {
        document.location.href = data.config.url;
    });
}

/**
 *
 * @param codeParam
 */
export async function postAccessToken(codeParam : string) : Promise<AxiosResponse> {
    return await axios.post(buildAccessTokenEndpoint(codeParam)).then(data => {
        const search = data.data.substring(0);
        const result = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
        return result.access_token;
    });
}

function buildAuthorizeEndpoint() : string {
    let clientIdParam = "?"+ EndPointParameters.CLIENT_ID + "=" + process.env.GITHUB_CLIENT_ID;
    let scopeParam = "&" + EndPointParameters.SCOPE + "=" + ScopeParamValues.REPO;
    let redirectUriParam = "&"+ EndPointParameters.REDIRECT_URI + "=" + Url.REDIRECT_URI;
    return Url.AUTHORIZE_URL + clientIdParam + scopeParam + redirectUriParam;
}

function buildAccessTokenEndpoint(codeParam : string) : string {
    let clientIdParam = "&client_id=" + process.env.GITHUB_CLIENT_ID;
    let clientSecretParam = "&client_secret=" + process.env.GITHUB_CLIENT_SECRET;
    return Url.ACCESS_TOKEN_URL + codeParam + clientIdParam + clientSecretParam;
}
