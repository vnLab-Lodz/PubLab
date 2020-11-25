export interface Repository {
    name: string,
    author: string,
    url: string
}

export interface File {
    filename: string,
    path: string
}

export enum Url {
    REDIRECT_URI = "http://localhost:3000/main_window",
    AUTHORIZE_URL = "https://github.com/login/oauth/authorize",
    ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"
}

export enum EndPointParameters {
    CLIENT_ID = "client_id",
    REDIRECT_URI ="redirect_uri"
}