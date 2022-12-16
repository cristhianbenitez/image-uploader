const app = require('./app');
const http = require('http');
const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
