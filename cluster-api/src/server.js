import http from "http";

const processId = process.pid;

const server = http.createServer((req, res) => {
  for (let index = 0; index < 1e7; index++)
    res.end(`handled by pi: ${processId}`);
});

server.listen(5000).once("listening", () => {
  console.log("Server start in process", processId);
});

process.on("SIGTERM", () => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log("server ending", new Date().toISOString());
  server.close(() => process.exit());
});

function grafulshutdown(event) {
  return (code) => {
    console.info(`${event} received! with ${code}`);
    console.log("Closing http server...");
    console.log(new Date().toISOString());
    server.close(() => process.exit());
  };
}

// --- grafulshutdown
process.on("SIGINT", grafulshutdown("SIGINT"));

process.on("SIGTERM", grafulshutdown("SIGTERM"));

process.on("exit", (code) => {
  console.log("exit signal received", code);
});

setTimeout(() => {
  process.exit(1);
}, Math.random() * 1e5);
