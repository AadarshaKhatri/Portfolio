"use client";
import { UserModel } from "@/app/types/interfaces";
import { Suspense, useActionState, useEffect, useState } from "react";
import { getUniqueUser, UpdateAccount } from "./action";
import { toast } from "sonner";
import Image from "next/image";
import Status from "./components/Status";

const AccountStatus = () => {
  const [state, action] = useActionState(UpdateAccount, null);
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    async function fetchUser() {
      const response = await getUniqueUser();
      setUser(response);
    }
    fetchUser();
  }, [state]);
  useEffect(() => {
    setTimeout(() => {
      if (state?.success) {
        toast.success(`${state?.message}`);
      } else if (state?.error) {
        toast.error(`${state?.error}`);
      }
    }, 0);
  }, [state]);
  return (
    <section className="container mx-auto px-6 md:px-0 py-10">
      <div className="flex flex-col justify-between items-start gap-10">

        {/* Account Status */}
        <div className="flex flex-col justify-center items-center">
        <Suspense fallback={<p className="text-primary">Loading....</p>}>
            <Status/>
        </Suspense>
        </div>
        {/* Account Settings Form */}
        <div className="flex-1">
          <div className="w-full flex justify-start items-start">
            <h1 className=" text-2xl font-semibold text-white/50 pb-5">Update your profile</h1> 
          </div>
          <form action={action} className="flex flex-wrap gap-6">
          <div className="w-full flex fle-row justify-center items-center gap-10">
                  {user?.profile ? (
                    <div className="relative">
                      <Image priority={true} quality={100} width={100} height={100} src={user.profile} alt="Project Image" className="w-[200px] h-auto object-fill"  />
                    </div>
                  ) : <div><h3 className="text-primary">No Images Uploaded</h3></div>}
                  <div className="flex flex-col justify-center items-start">
                      <input
                        name="image"
                        type="file"
                        className="text-white border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white mt-2"
                      />
                      <span className="text-primary text-sm">Note: The current Image will be replaced by the one you will be uploading</span>
                  </div>
            
                    </div>
            <input name="id" defaultValue={user?.id} className="hidden" />

            {/* First Row - Full Width */}
            <div className="flex w-full gap-6">
              <input
                name="title"
                type="text"
                placeholder="Title Here"
                className="text-white border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
                defaultValue={user?.title}
              />
            </div>

            {/* Second Row - Three Inputs in One Line */}
            <div className="flex flex-col md:flex-row w-full gap-6">
              <input
                name="born"
                type="date"
                placeholder="BirthDate"
                className="text-white border-b-2 border-primary w-full md:w-1/3 py-3 px-4 bg-[#01071D] outline-none focus:border-white"
                defaultValue={
                  user?.born
                    ? new Date(user.born).toISOString().split("T")[0]
                    : ""
                }
              />
              <input
                name="degree"
                type="text"
                placeholder="Graduation"
                className="text-white border-b-2 border-primary w-full md:w-1/3 py-3 px-4 bg-[#01071D] outline-none focus:border-white"
                defaultValue={user?.degree}
              />
              <input
                name="location"
                type="text"
                placeholder="Location"
                className="text-white border-b-2 border-primary  w-full md:w-1/3 py-3 px-4 bg-[#01071D] outline-none focus:border-white"
                defaultValue={user?.location}
              />
            </div>

            {/* Third Row - Full Width */}
            <div className="flex w-full">
              <input
                name="bio"
                type="text"
                placeholder="Bio"
                className="text-white border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
                defaultValue={user?.bio}
              />
            </div>

            {/* Fourth Row - Full Width */}
            <div className="flex w-full">
              <textarea
                name="description"
                placeholder="Description of the About Us Page"
                className="text-white min-h-52 border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D]  outline-none focus:border-white"
                defaultValue={user?.description}
              ></textarea>
            </div>

            <div className="w-full flex flex-row justify-center items-center mt-5">
              <button
                className="text-white bg-green-800 rounded-md text-lg py-3 px-6 hover:bg-green-800/50"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AccountStatus;
