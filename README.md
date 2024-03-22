# Home Library Service

### Server part of a music library web app

## Prerequisites
- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## How to run

1) Clone the repo `git clone {repository URL}`
2) Go to the working dir `cd nodejs2024Q1-service`
3) Go to dev branch `git checkout rest-service`
4) Install deps `npm ci`
5) Rename `.env.example` to `.env`
6) Run the app `npm run start:docker`
7) Generate migration `npm run typeorm:generate`
8) Run migration `npm run typeorm:run`

command #6 `npm run start:docker` runs script for creating 3 containers - one for app, one for database and one for pgAdmin4. You can access database from pgAdmin4 web interface available at `localhost:8080`. 

If the app starts throwing ts errors at files in migrations folder, you can exclude it from app builder (open file `tsconfig.build.json` add uncomment `migrations`)

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/. You can retrieve JSON- and YAML-formatted docs by visiting http://localhost:4000/doc-json/ and http://localhost:4000/doc-yaml/ respectively. Also up-to-date swagger docs can be found in `docs/api.yaml`.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Docker image scan

To scan app image for vulnerabilities run

```
npm run docker:scan
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

To run refresh token tests

```
npm run test:refresh
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
