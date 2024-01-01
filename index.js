require('dotenv').config();
const app = require('./server');
const { port, baseURL } = require('./config/serverConfig');

app.listen(port, () => {
  console.log(`Server is running on ${baseURL}:${port}`);
});
