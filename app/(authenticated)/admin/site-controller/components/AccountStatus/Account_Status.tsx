import prisma from "@/app/lib/db";
import { UserModel } from "@/app/types/interfaces";
import { Suspense } from "react";

const AccountStatus = async () => {
  const user: UserModel = await prisma.user_models.findFirst();
  console.log(user);
  return (
    <section className="container mx-auto px-6 md:px-0 py-10">
      <h3 className="text-primary text-2xl font-semibold mb-6">Account Settings</h3>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Profile Image Section */}
        <div className="w-[300px] flex justify-center items-center">
          <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-lg">
            Image Here
          </div>
        </div>

        {/* Account Settings Form */}
        <div className="flex-1">
          <form className="flex flex-wrap gap-6">
            {/* First Row - Full Width */}
            <div className="flex w-full">
              <input 
                type="text" 
                placeholder="Title Here" 
                className="text-white border-2 border-primary rounded-md w-full py-3 px-4 bg-[#01071D]" 
                defaultValue={user?.title} 
              />
            </div>
            
            {/* Second Row - Three Inputs in One Line */}
            <div className="flex w-full gap-6">
              <input 
                type="date" 
                placeholder="BirthDate" 
                className="text-white border-2 border-primary rounded-md flex-1 py-3 px-4 bg-[#01071D]" 
                defaultValue={user?.born ? new Date(user.born).toISOString().split("T")[0] : ""} 
              />
              <input 
                type="text" 
                placeholder="Graduation" 
                className="text-white border-2 border-primary rounded-md flex-1 py-3 px-4 bg-[#01071D]" 
                defaultValue={user?.degree} 
              />
              <input 
                type="text" 
                placeholder="Location" 
                className="text-white border-2 border-primary rounded-md flex-1 py-3 px-4 bg-[#01071D]" 
                defaultValue={user?.location} 
              />
            </div>
            
            {/* Third Row - Full Width */}
            <div className="flex w-full">
              <input 
                type="text" 
                placeholder="Bio"
                className="text-white border-2 border-primary rounded-md w-full py-3 px-4 bg-[#01071D]"
                defaultValue={user?.bio} 
              />
            </div>
            
            {/* Fourth Row - Full Width */}
            <div className="flex w-full">
              <textarea 
                placeholder="Description of the About Us Page" 
                className="text-white border-2 border-primary rounded-md w-full py-3 px-4 bg-[#01071D] h-24"
                defaultValue={user?.description}
              ></textarea>
            </div>

            <div className="w-full flex flex-row justify-center items-center mt-5">
              <Suspense fallback={'Loading...'}>
                <button className="text-white bg-green-800 rounded-md text-lg py-3 px-6 hover:bg-green-800/50" type="submit">Save</button>
              </Suspense>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AccountStatus;