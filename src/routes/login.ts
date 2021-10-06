import {Context} from "koa";
import Router from "koa-router";
import Auth from "basic-auth";
import { admin, user } from "../user";

const router = new Router();

const adminCheck = (name:string ) => { 
    return admin.name == name;
};

const check = (name:string ,pass: string) => { 
    let isAdmin = admin.name == name && admin.pass == pass;
    let isUser = user.name == name && user.pass == pass;

    return isAdmin || isUser;
};

router.post(`/login`, async (ctx: Context) => {
  try {

    let credentials = Auth(ctx.req) || {name:"",pass:""};
    if(check(credentials.name, credentials.pass)){
        ctx.status = 200;
        ctx.cookies.set('auth', JSON.stringify({signedIn:true, isAdmin: adminCheck(credentials.name)}), {httpOnly: true});
        ctx.body = "Logged In";
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