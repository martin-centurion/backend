export default {
    port: process.env.PORT || 8080,
    persistence: process.env.PERSISTENCE || 'memory',
    db: {
        mongodb: process.env.MONGODB_URI || 'mongodb://localhost:27017/school',
    }
};