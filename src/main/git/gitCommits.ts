import {Octokit} from "@octokit/rest";
import {Commit, CommitDiff} from "./gitTypes";

export function getListOfCommits(accessToken: string, repo: string, owner: string): Commit[] {
    const commits: Commit[] = []
    let octokit = new Octokit({
        auth: accessToken
    })
    octokit.repos.listCommits({owner, repo}).then((res: any) => {
        res.data.forEach((commit: any) => {
            commits.push({
                sha: commit.sha,
                message: commit.commit.message,
                author: commit.commit.author.name,
                date: commit.commit.author.date
            })
        })
    })
    return commits
}

export function getCommitChanges(accessToken: string, repo: string, owner: string, ref: string,): CommitDiff[] {
    const diffs: CommitDiff[] = []
    let octokit = new Octokit({
        auth: accessToken
    })
    octokit.repos.getCommit({
        owner,
        repo,
        ref,
    }).then((res: any) => {
        console.log(res)
        res.data.files.forEach((file: any) => {
            diffs.push({
                filename: file.filename,
                differences: file.patch
            })
        })
    })
    return diffs
}
