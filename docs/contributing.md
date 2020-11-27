# Contributing to the codebase

## Main topics
### Projects
Each team has their own project and is obliged to follow the rules when it comes to tracking the work. Issues have to have correct labels and projects assigned. Our codebase will have many mini-projects and it is important to avoid mess and stay organized.

### Issues
Please follow the issue template whenever possible when creating new issues. An exemplary issue can be found [here](https://github.com/karczewskiPiotr/vnlab-tool/issues/1).
Make sure to tick all the checklist items.

### Pull requests
Please follow the pull request template whenever possible when creating new pull requests. An exemplary PR can be found [here](https://github.com/karczewskiPiotr/vnlab-tool/pull/2).
Make sure to tick all the checklist items.

## How do I contribute?
1. Create or choose an issue. Immediately assign it to yourself and move it to "In progress" and communicate that to your team so that you do not do the same work as someone else.
2. Work on the issue 👨🏼‍💻👩🏼‍💻
3. Create a clear and descriptive commit message (e.g. "Added Logout button to user menu")
4. Create a Pull request according to the template
5. Wait until all merge checks pass - reviews and CI/CD
6. Merge your PR

> All of the important actions should cause the issue you assigned to yourself to move to other Kanban columns accordingly. Please make sure that the issue is in the correct column after each step.

## Projects directory structure
Quick guide how to traverse the project.

```sh
+-- public # Entry folder for webpack and electron
+-- src # Folder for fron-end related code
|    +-- assets 
|    +-- components
|         +-- component # Keep components in a separate folders wtih style files
|         |    +-- component.tsx
|         |    +-- component.scss
|         +-- component
|         |    +-- component.tsx
|         |    +-- component.scss
|    +-- constants
+-- utils # Folder for back-end related code
|   +-- api # Logic that will be called on front-end
|   +-- git # Logic for interacting with git and GitHub
|   +-- shell # Logic for calling gatsby-cli, traversing local files adn generating config
```

The `utils/api` folder will contain logic that implements/combines *git* and *shell* modules to expose functionalities to front-end. For example:
 * *git* module has logic responsible for looking up remote web publication repositories
 * *shell* module has logic responsible for looking up local web publication repositories
 * *api* module combines the result of the two above to provide front-end with cohesive response