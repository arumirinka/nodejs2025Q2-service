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
- `library-service-p3` for task 3

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
or (for task 2)
```
npm run docker:up
```

After starting the app on port (4000 as default) you can open
Postman (http://localhost:4000/) and check the endpoints and functionality mentioned in the [task description](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md).

## Testing

When the application is running, open new terminal and enter:

To run all tests without authorization (please note that this is not going to work in the task 3)

```
npm run test
```

To run only one of all test suites (please note that this is not going to work in the task 3)

```
npm run test -- <path to suite>
```

To run all test with authorization (for task 3)

```
npm run test:auth
```

To run only specific test suite with authorization (for task 3)

```
npm run test:auth -- <path to suite>
```


### Stopping the app (for task 2)

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
