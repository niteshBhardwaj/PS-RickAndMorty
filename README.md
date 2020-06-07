PS Rick and Morty DB

## Available Scripts 

In the project directory, you can run:

### `npm run react`

Runs the development server for the frontend.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run server`

Runs the developement server for the backend.<br />
By default development server will run on [http://localhost:2001](http://localhost:2001)

### `npm run build`

It will create two folders in the root directory for the production. <br />
One is the **build** folder for the frontend code. <br />
And another is the **compiled** folder for the backend.


### `npm run test`
Run all the test cases

### `Additional commands`
**build:react** to a frontend build, for the production.
**build:server**: to a backend build, for the production.


## Learn More

### Config 

Set up your config keys for the development, in the path of **[server/config/env.json]**.

### DOCKER

Using docker you can test your production environment in the local machine. <br />
Use command **[docker-compose up --build]**

### Travis CI and Heroku for deployment

When we push the code to Github. Travis CI will run all the test cases, if the test cases pass, Travis will deploy the build to Heroku. Setup Travis keys in travis.yml for deployment.

