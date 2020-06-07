PS Rick and Morty DB

## Available Scripts 

In the project directory, you can run:

### `npm run react`

Runs the developement server for the frontend.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run server`

Runs the developement server for the backend.<br />
By default development server will run on [http://localhost:2001](http://localhost:2001)

### `npm run build`

will create two folder in the root directory for the production <br />
In **build** folder all the frontend code. <br />
In **compiled** folder all compiled backend code.


### `npm run test`
Run all the test cases

### `Additional commands`
**build:react** build frontend for the production
**build:server**: build backend for the production,

## Learn More

### Config 

Setup your config keys for the develpment. In [server/config/env.json] file.

### DOCKER

Using docker you can test your production environment. <br />
CMD docker-compose up --build

### Travis CI and Heroku for deployment

When you push the code to github. Travis CI will run all the test cases, if all the test cases passes travis will deploy build to heroku.
Setup your keys in travis.yml for deployment.

