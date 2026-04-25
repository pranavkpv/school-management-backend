const databaseConfig = () => ({
  database: {
    uri: process.env.MONGO_URI,
  },
});

export default databaseConfig;