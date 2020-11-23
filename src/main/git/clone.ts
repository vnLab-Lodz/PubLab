const path = require('path')
const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const fs = require('fs')

const dir = 'C:/Users/jedre/Desktop/test'

export function performClone(): void {
    git.clone({
        fs,
        http,
        dir,
        corsProxy: 'https://cors.isomorphic-git.org',
        url: 'https://github.com/jedrekszor/SmartPlant',
        ref: 'master',
        singleBranch: true,
        depth: 10
    });
}