module.exports = {
  mysql:{
    host:'localhost',
    user:'root',
    password:'PINA#3996',
    database:'service'
  },
  server:{
    port:4000
  },
  mongo:{
    debug:true,
    mongoUri:'mongodb://localhost/service',
    sessionSecret: 'dev_secret_key'
  }
};
