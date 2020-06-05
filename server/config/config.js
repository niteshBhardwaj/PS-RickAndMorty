let env = process.env.NODE_ENV || "development";

  console.log('NODE_ENV', env)

  let config = require('./env.json')
  let envConfig = config[env];
  if(envConfig) {
    Object.keys(envConfig).forEach((key) => {
      process.env[key] = envConfig[key];
    })
  }

