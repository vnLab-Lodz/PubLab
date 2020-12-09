import { expect } from "chai";
import { isPublication, isDirectory, findLocalPublications } from "../src/main/node/file-manager";

describe("Function", () => {
    it("Checking if the path is a Publication", () => {
        let check : boolean = isPublication(""); //To check give a directory path which contains the publication_config.json file.
        expect(check).to.be.equal(true);
    });
    it("Checking if the path is Directory", () => {
        let check: boolean = isDirectory(""); //To check give a directory path
        expect(check).to.be.equal(true);
    });
    it("Checking if the async function is called", () => {
        let promise = findLocalPublications(""); //To check give a directory path which contains propper publication_config.json file
        expect(2).to.equal(2);
    })
});