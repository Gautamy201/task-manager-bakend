const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;
// Create an HTTP server

const server = http.createServer(app);

// Set up port and IP

server.listen(port, () => {
  console.log(`\nserver is running on ${`http://localhost:${+port}`} \n`);
});
