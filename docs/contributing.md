# Contributing to the codebase

## Main topics

### Issues

Please follow the issue template whenever possible when creating new issues. An exemplary issue can be found [here](https://github.com/vnLab-Lodz/PubLab/issues/1).
Make sure to tick all the checklist items.

### Pull requests

Please follow the pull request template whenever possible when creating new pull requests. An exemplary PR can be found [here](https://github.com/vnLab-Lodz/PubLab/pull/2).
Make sure to tick all the checklist items.

## How do I contribute?

1. Create or choose an issue. Immediately assign it to yourself and move it to "In progress" and communicate that to your team so that you do not do the same work as someone else.
2. Work on the issue 👨🏼‍💻👩🏼‍💻
3. Create a clear and descriptive commit message (e.g. "Added Logout button to user menu")
4. Create a Pull request according to the template
5. Wait until all merge checks pass - reviews and CI/CD
6. Merge your PR

> All of the important actions should cause the issue you assigned to yourself to move to other Kanban columns accordingly. Please make sure that the issue is in the correct column after each step.

## Project directory structure

Quick guide how to traverse the project.

```sh
+-- public # Entry folder for webpack and electron
+-- src
|    +-- main # All "back-end" code that runs on main process
|      +-- git # All operations on git and GitHub
|      +-- node # All operations on local files
|    +-- renderer # Front-end  that runs on renderer process
|      +-- assets
|      +-- components
|      |    +-- component # Keep components in a separate folders wtih style files
|      |    |    +-- component.tsx
|      |    |    +-- component.scss
|      |    +-- component
|      |    |    +-- component.tsx
|      |    |    +-- component.scss
|      +-- views # All components that render main views of the project
|      +-- constants
|    +-- shared # Logic shared between main and rendere process
|      +-- redux
|      |    +-- slices # Redux Toolkit slices to manage actions adn reducers
|      |    +-- helpers # Redux helpers for async actions / main thread actions
|      +-- utils
```
