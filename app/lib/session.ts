  import "server-only"
  import { SignJWT,jwtVerify } from "jose"
  import { redirect } from "next/navigation";
  const key = new TextEncoder().encode(process.env.TOKEN_SECERET)

  const cookies = {
    name:"session",
    options:{
      httpOnly:true,
      secure:true,
      sameSite:"lax",
      path:"/"
    },
    duration:24*60*60*1000,
  }


  export async function encrypt(payload){
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({alg:'HS256'})
      .setIssuedAt()
      .setExpirationTime('1day') // Set expiration (optional)
      .sign(key);
    return jwt;

  }

  export async function dcrypt(token:string){
    try {
      const { payload } = await jwtVerify(token, key);
      return payload;  // Return the payload if token is valid
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }



  export async function  CreateSession(userEmail){
    const expires = new Date (Date.now()+cookies.duration);
    const session = await encrypt({userEmail,expires});
    

    //Setting up the cookies
    cookies().set(cookies.name,session,{...cookie.options,expires})
    redirect ("/admin/site-controller");

  }

  export async function verifySession(){
    const cookies = cookies().get(cookie.name)?.value
    const session = await dcrypt(cookies);
    if(!session?.userEmail){
      redirect("/admin/login")
    }

    return {userId:session.userEmail}

  }
  export async function deleteSession(){
    cookies().delete(cookies.name)
    redirect("/admin/login");

    
  }