import axios, {AxiosResponse} from 'axios'
import {EndPointParameters, Url} from "./gitTypes";

// TODO Trzeba to wpisać do zmiennych środowiskowych, aby nie zostało wyeksponowane
const client_id = "6d941531c2e642fadf62";
const client_secret = "1100c9fb26028bb083b029e84248312a57066b84 ";

/**
 *
 */
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
    let clientIdParam = "?"+ EndPointParameters.CLIENT_ID + "=" + client_id;
    let redirectUriParam = "&"+ EndPointParameters.REDIRECT_URI + "=" + Url.REDIRECT_URI;
    return Url.AUTHORIZE_URL + clientIdParam + redirectUriParam;
}

function buildAccessTokenEndpoint(codeParam : string) : string {
    let clientIdParam = "&client_id=" + client_id;
    let clientSecretParam = "&client_secret=" + client_secret;
    return Url.ACCESS_TOKEN_URL + codeParam + clientIdParam + clientSecretParam;
}
