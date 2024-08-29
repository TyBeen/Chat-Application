import { Link, Outlet } from 'react-router-dom'

export default function Auth({isLinksShowing}) {

    return (
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            
            {isLinksShowing && (
                <div>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                Welcome to Chatroom!
                </h1>
                <h3 className="uppercase text-center text-5xl font-bold tracking-widest text-gray-500 dark:text-gray-400">
                Login / Register
                </h3>
                <nav id="loginRegister" className="flex flex-row flex-auto items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 group h-64">
                    <Link to="/login" className='login'><button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button></Link>
                    <Link to="/register" className='register'><button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Register</button></Link>
                </nav>
                </div>
            )}

            <Outlet />
        </div>
    )
}