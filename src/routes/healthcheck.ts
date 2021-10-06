import {Context} from "koa";
import Router from "koa-router";
import fs from "fs";

const messagelogFile = '../../messagelog.json';

const router = new Router();

router.get('/ping', async (ctx: Context)=> {
  try {
    fs.writeFile(messagelogFile, JSON.stringify({numberOfCalls:0,lastMessage:""}), (err) => { 
      return err ? console.log(err): console.log("reset file");
    });
    ctx.body = {
      status: "success",
      data:"pong",
    };
  } catch (error) {
    console.error(error);
  }
})
export default router;