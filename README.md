# vnLab Tool

Tool that helps you kick off your next web publicaion project in no time.

## Content

1. [Technologies](#technologies)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)

## Technolgoies

- Electron 10
- Webpack 4
- React 17

## Prerequisites

To work on this project you will need to have [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) installed on the machine.

## Setup

From command line:

1.  Clone the repository

    ```bash
    # SSH (Recommended if you have keys configured)
    $ git clone git@github.com:karczewskiPiotr/vnlab-tool.git

    # HTTPS
    $ git clone https://github.com/karczewskiPiotr/vnlab-tool.git
    ```

2.  Create an OAuth Application

    2a. Enter profile's **Settings** section

    2b. Select **Developer Settings** -> **OAuth Apps** -> **New OAuth App**

    2c. Pick name for the application (it won't affect the project) and specify **Home page URL** and **Authorization callback URL** and register your application

        Home page URL: https://github.com/login/oauth/authorize

        Authorization callback URL: http://localhost/main_window

    2d. Inside **Client secrets** section generate a new client secret

3.  Move into directory

    ```bash
    $ cd vnlab-tool
    ```

4.  Install dependecies

    ```bash
    $ yarn install
    ```

5.  Create **.env** file inside the project's root directory

6.  Inside the **.env** file specify client id and secret by pasting the following

    ```
    GITHUB_CLIENT_ID=clientid
    GITHUB_CLIENT_SECRET=clientsecret
    ```

    Where `clientid` is accessible through created OAuth App under the **Client ID** section, `clientsecret` is accessible under the **Client secrets** section.

7.  Run the app in development environment

    ```bash
    $ yarn start
    ```

## Package manager

Use **yarn** in this project. If you want to use **npm**, do so under our own responsibility. (`package-json.lock` is excluded from repository)
