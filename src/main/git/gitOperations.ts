const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const fs = require('fs')

export function clone(dir: string, url: string): void {
    git.clone({
        fs,
        http,
        dir,
        corsProxy: 'https://cors.isomorphic-git.org',
        url,
        ref: 'master',
        singleBranch: true,
        depth: 10
    });
}