import {Context} from "koa";
import Router from "koa-router";
import fs from "fs";

const router = new Router();
const messagelogFile = '../../messagelog.json';

router.get('/stats', async (ctx: Context)=> {
  try {
    let auth = JSON.parse(ctx.cookies.get("auth")||"{}");    
      if(auth.signedIn && auth.isAdmin){
        let content = JSON.parse(fs.readFileSync(messagelogFile, 'utf8'));
        ctx.body = content;
      } else {
        ctx.status = 401;
        ctx.set('WWW-Authenticate', 'Basic');
        ctx.body = 'Not Authorized';
      };
  } catch (error) {
    console.error(error);
  }
})
export default router;