var env = process.env.NODE_ENV || 'development';//which will be by default development if we are not running test & by default production when running in heroku

if(env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGOLAB_URI = 'mongodb://localhost:27017/MTodoApp';
}else if (env === 'test'){
  process.env.PORT = 3000;
  process.env.MONGOLAB_URI = 'mongodb://localhost:27017/MTodoAppTest';//so we can use test DB separately
}
