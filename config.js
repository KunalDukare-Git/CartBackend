const config = {
  local: {},

  staging: {
    Database: {
      host: "localhost",
      port: "27017",
      dbName: "Cart",
      mongoose: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      userName: "",
      password: "",
    },
    email:{
      username:"kunaldukare777@gmail.com",
      password:"reebjahgdttjmuof",
      host:"smtp.gmail.com",
      port:465
  },
    api_port: 9090,
  },

  production: {},
};

export const get = function (env) {
  return config[env];
};
