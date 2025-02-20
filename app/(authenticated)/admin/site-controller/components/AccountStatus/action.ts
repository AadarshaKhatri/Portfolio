import prisma from "@/app/lib/db";




export async function UpdateAccount(formdata:FormData){
  try{
    const id = formdata.get("id") as string;
    const bio = formdata.get("bio") as string;
    const name = formdata.get("name") as string;
    const date = formdata.get("date") as string;
    
    console.log(bio)

    const updatedUser = await prisma.user_models.updateMany({
      where:{
        id:Number(id)
      },
      data:{
        name:name,
        bio:bio,
        born:date
      }
    })

    if(updatedUser.count>0){
      return {
        success:true,
        message:"User Succesfully Updated",
        error:null,
      }
    }

  }catch(err){
    console.log(err)
    return {
      success:false,
      error:"Failed to Update the Account",
      message:null,
    }
  }
}