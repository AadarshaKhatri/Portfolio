
import { logout } from "../../../login/action";

const NavigationBar = ()=>{
  return(
    <nav className="max-w-full sticky top-0 backdrop-blur-sm z-50">
      <div className="max-w-full flex flex-row justify-between items-center mx-10 py-5">
        <div >
           <h1 className="text-md text-primary">Dashboard</h1>
        </div>

        <div>
          <form action={logout}>
          <button type="submit" className="text-white text-md bg-red-500 hover:bg-red-500/50 py-2 px-4 rounded-md">Logout</button>
          </form>
        </div>
      </div>

    </nav>
  )
}

export default NavigationBar
