export default () => ({
  database: {
    uri: process.env.MONGO_URI,
  },
  port: {
    num: Number(process.env.PORT) || 5000,
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'change-me-in-env',
  },
});