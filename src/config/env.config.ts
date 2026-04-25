export default () => ({
  database: {
    uri: process.env.MONGO_URI
  },
  port: {
    num: Number(process.env.PORT)
  },
  frontend: {
    url: process.env.FRONTED_URL
  }
});