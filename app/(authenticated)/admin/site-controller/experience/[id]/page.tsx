import Link from "next/link"
import { Suspense } from "react"
import EditExperience from "./components/EditExperience"



const page = () => {
  return (
    <section className="container mx-auto">
    <div className="flex flex-col justify-center items-center py-20 gap-10">
      <div className="flex w-full justify-start items-start ">
        <button className="text-white bg-primary hover:bg-primary/50 px-3 py-2 rounded-md"><Link href={"/admin/site-controller"}>Go back</Link></button>

      </div>
      <div className="text-primary">
        <Suspense fallback={<p className="text-primary"></p>}>
          <EditExperience/>
        </Suspense>
      </div>
      
    </div>
  </section>
  )
}

export default page