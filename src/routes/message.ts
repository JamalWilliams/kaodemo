import {Context} from "koa";
import Router from "koa-router";
import fs from "fs";

const router = new Router();
const messagelogFile = '../../messagelog.json';




router.post(`/message`, async (ctx: Context) => {
  try {

    let auth = JSON.parse(ctx.cookies.get("auth")||"{}");
    
      if(auth.signedIn ){
        ctx.status = 201;
        let messagelog = JSON.parse(fs.readFileSync(messagelogFile, 'utf8'));
        console.log('Read ' + JSON.stringify(messagelog));
        messagelog.numberOfCalls++;
        let lastMessage = ctx.request.body.message;
        let content = {...messagelog, lastMessage};
        fs.writeFile(messagelogFile, JSON.stringify(content), (err) => { return err ? console.log(err): console.log("saved to file" + JSON.stringify(content));});
        
        ctx.body = content;
    } else {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'Not Authorized';
    };

  } catch (err) {
    console.error(err);
  }
});

export default router;