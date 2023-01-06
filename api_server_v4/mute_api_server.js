const express = require("express");
const cors = require("cors");

const serverPort = 8088;
const key = "mute";

const app = express();
const client = require("redis").createClient({
  socket: {
    host: "redis",
    port: 6379,
  },
});

const logerr = (err) => console.log(err.message);

(async () => {
  await client.connect().catch(logerr);
})();

client.on("error", (err) => console.log("Redis Client Error", err));

app.use(cors());

app.get("/", async function (request, response) {
  const value = await client.get(key).catch(logerr);
  console.log(`${key}: ${value}`);
  response.send(JSON.stringify({ [key]: value }));
});

app.get("/mute", async function (request, response) {
  await client.set(key, "true").catch(logerr);
  const value = await client.get(key).catch(logerr);
  console.log(`${key}: ${value}`);
  response.send(JSON.stringify({ [key]: value }));
});

app.get("/unmute", async function (request, response) {
  await client.set(key, "false").catch(logerr);
  const value = await client.get(key).catch(logerr);
  console.log(`${key}: ${value}`);
  response.send(JSON.stringify({ [key]: value }));
});

var server = app.listen(serverPort, function () {
  console.log(`mute api server listening at ${serverPort} ...`);
});
