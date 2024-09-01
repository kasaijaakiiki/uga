import * as http from "http";
import debug from "debug";
import app from "../server";

/**
 * Normalize a port into a number, string, or false.
 */
export const normalizePort = (val: string): number | string | boolean => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

/**
 * Event listener for HTTP server "error" event.
 */
export const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
export const onListening = (): void => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("eazzy-exchange-backend")("Listening on " + bind);
};

/**
 * Get port from environment and store in Express.
 */
export const port = normalizePort(process.env.PORT || "5600");
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

console.log(port);
console.log(`listening on ${port}`)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
