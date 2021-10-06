import {Context} from "koa";
import Router from "koa-router";

const router = new Router();

router.delete('/logout', async (ctx: Context)=> {
  try {
    let auth = JSON.parse(ctx.cookies.get("auth")||"{}");
    if(auth.signedIn ){
      ctx.cookies.set('auth', JSON.stringify({signedIn:false, isAdmin: false}), {httpOnly: true});
      ctx.body = "Loged Out";
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