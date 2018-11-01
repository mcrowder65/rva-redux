import express from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-console
  console.log("CORs enabled");
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("*.js", (req, res, next) => {
  // eslint-disable-next-line no-param-reassign
  req.url += ".gz";
  res.set("Content-Encoding", "gzip");
  next();
});
app.get("/ping", (req, res) => {
  res.send(`The server says hello`);
});
app.use(express.static(path.resolve(__dirname, "../..", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

// eslint-disable-next-line no-console
const server = app.listen(3000, () =>
  console.log(`server started on port 3000`)
);
export default server;
