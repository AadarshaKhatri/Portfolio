import { useActionState, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { toast } from "sonner";
import { createLang } from "../../../../action";

export default function AddLangDialouge() {
  const [isOpen, setIsOpen] = useState(false);
  const [state,action] = useActionState(createLang,{
    success:false,
    error:null,
    message:null
  });
  useEffect(() => {
    setTimeout(() => {
      if (!state?.success && state?.error) {
        toast.error(`${state?.error}`);
      } else if (state?.success && state.message) {
        toast.success(`${state?.message}`);
        setIsOpen(false)
        setTimeout(()=>{
          window.location.reload();
        },3000)
      }
    }, 0);
  }, [state]);

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={handleOpen} className="px-4 py-2 bg-primary text-white rounded-md">
        Add Langauges
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-lg">
          <div className="bg-[#01071D] p-6 rounded-2xl shadow-xl w-[500px]">
            <div className="flex justify-between items-center">
              <h2 className="text-lg text-white font-semibold">Please provide wiht the information requested to create a Language</h2>
              <button onClick={handleClose} className="text-primary hover:text-gray-600">
                <MdCancel size={24} />
              </button>
            </div>
            
            {/* Inputs fro creating the form */}
            <form action={action} className="mt-5 pb-5 flex flex-col justify-center items-center gap-10">

              <div className="w-full flex flex-col">
              <input
                  type="text"
                  name="title"
                  placeholder="Enter the Language; For example: Java"
                  className="text-white border-b-2 border-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
                />
              </div>

              <div className="flex w-full">
                <input
                  name="image"
                  type="file"
                  placeholder="Upload an Image"
                  className="text-white border-b-2 border-b-primary w-full py-3 px-4 bg-[#01071D] outline-none focus:border-white"
                />
              </div>
            <div className="mt-6 flex justify-end gap-4">
              <button type="submit" onClick={handleClose} className="text-white px-4 py-2  bg-red-600 rounded-md hover:bg-red-800">
                Cancel
              </button>
              <button  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Create
              </button>
            </div>         
            </form>
          </div>
        </div>
      )}
    </>
  );
}
