# Trafficman

Trafficman is an external github integration tool to enable easier merge status synchronization for pull requests in the same or different repositories.
It uses a string prefix to search for all open pull requests in the relevant repositories and return the commit status, using exclusively the Github API.
Thus, it is advised to be used together with a practice of naming pull requests after ticket names, such as "FOO-123: PR description"

## Getting Started

In order to run the project, clone it and run `npm i` to install all the necessary external libraries. Afterwards, you may go into the project's directory and run `node ./src/index.js` to start the server. By default, the application's REST server runs in port 3000.

### Prerequisites

In order to run the application you need to have npm and node installed.