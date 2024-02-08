export default {
    ENV: process.env.NODE_ENV || "dev",
    PORT: process.env.PORT || 8080,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce',
  }