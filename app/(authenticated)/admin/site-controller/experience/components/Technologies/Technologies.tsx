import LangStack from "./components/LangStack/LangStack"
import TechStack from "./components/TechStack/TechStack"


const Technologies = () => {
  return (
    <section>
      <div className="container mx-auto pb-10">
        <div className="flex flex-col justify-center items-center gap-5">
          {/* Technologies */}
          <TechStack/>

          {/* Languages */}
          <LangStack/>
          
          </div>
        </div>

    </section>
  )
}

export default Technologies