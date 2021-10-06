import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";
import { config } from "./config";
import healthcheckRoutes from "./routes/healthcheck"
import messageRoutes from "./routes/message"
import statsRoutes from "./routes/stats"
import loginRoutes from "./routes/login"
import logoutRoutes from "./routes/logout"


const app = new Koa();
const PORT = config.port;


app.use(bodyParser());
app.use(
  cors({
    origin: "*"
  })
);
app.use(logger());


app.use(healthcheckRoutes.routes());
app.use(messageRoutes.routes());
app.use(statsRoutes.routes());
app.use(loginRoutes.routes());
app.use(logoutRoutes.routes());

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on("error", e => {
  
  });

export default server;