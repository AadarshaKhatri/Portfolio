import { FaDribbble, FaGithub, FaLinkedin } from "react-icons/fa"


const Footer = () => {
  return (
    <section className="py-20 ">
    <div className=" w-full flex flex-row justify-between ">
        <div className="w-full flex flex-col gap-y-5">

          <div className="w-full flex flex-row justify-center gap-x-5">
            <a target="_blank" href ="https://github.com/AadarshaKhatri"><FaGithub size={24} className="text-white"/></a>
            <a target="_blank" href="https://www.linkedin.com/in/aadarsha01/"><FaLinkedin size={24}className="text-white"/></a>
            <a target="_blank" href="https://dribbble.com/aadarsha1"><FaDribbble size={24}className="text-white"/></a>

          </div>
          <p className="text-center text-sm text-gray-400">Made By Aadarsha Khatri</p>

        </div>

     

      </div>


    </section>
  )
}

export default Footer