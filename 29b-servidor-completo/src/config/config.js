export default {
    port: process.env.PORT || 8080,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:8080/marketplace'
}