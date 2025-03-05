"use server"
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.TOKEN_SECRET
const encodedKey = new TextEncoder().encode(secretKey)


type SessionPayload =  {
  userId:string,
  userName:string,
  expiresAt:Date,
}
 
export async function encrypt(payload : SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string) {
  try {
 
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
 
    return payload
  } catch (error) {
    console.log('Failed to verify session');
    
  }
}

export async function createSession(userId: string,userName:string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId,userName,expiresAt })
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  })

}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}


export async function getUser() {
  const cookieStore = cookies();
  const session = (await cookieStore).get("session")?.value;

  if (!session) {
    return null; 
  }

  const payload = await decrypt(session);
  return {
    userId: payload?.userId as number,
    userName : payload?.userName as string,
  }
}

 
