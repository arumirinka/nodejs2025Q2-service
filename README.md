# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Desktop - [Download & Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Downloading

```
git clone https://github.com/arumirinka/nodejs2025Q2-service.git
```

Please do not forget to switch to the proper branch:
- `library-service` for task 1
- `library-service-p2` for task 2

## Installing NPM modules

```
npm ci
```

## Adding env variables

Create the `.env` file and paste there the contents of the `.env.example` file.

## Running application

```
npm start
```
or
```
npm run docker:up
```

After starting the app on port (4000 as default) you can open
Postman (http://localhost:4000/) and check the endpoints and functionality mentioned in the [task description](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md).

## Testing

When the application is running, open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Stopping the app

```
npm run docker:down
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
