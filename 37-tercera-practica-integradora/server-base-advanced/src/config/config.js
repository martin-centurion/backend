export default {
    PORT: process.env.PORT || 8080,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce',
    PERSISTENCE: process.env.PERSISTENCE || 'mongo',
    mail: {
      service: process.env.EMAIL_SERVICE || 'gmail',
      port: process.env.EMAIL_PORT || 587,
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
    }
  }