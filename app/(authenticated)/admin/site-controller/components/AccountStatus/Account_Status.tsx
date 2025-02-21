"use client";
import { UserModel } from "@/app/types/interfaces";
import { Suspense, useActionState, useEffect, useState } from "react";
import { getUser, UpdateAccount } from "./action";
import { toast } from "sonner";
import ImagePre from "./components/IamgePre";
const AccountStatus = () => {
  const [state, action] = useActionState(UpdateAccount, null);
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    async function fetchUser() {
      const response: UserModel = await getUser();
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
        <ImagePre />

        {/* Account Settings Form */}
        <div className="flex-1">
          <form action={action} className="flex flex-wrap gap-6">
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
