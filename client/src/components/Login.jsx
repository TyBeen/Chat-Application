import { useNavigate } from "react-router-dom";


export default function Login({setLinksHidden}) {
    const navigate = useNavigate();

    async function handleAccountLogin(e) {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        const body = {
            username: username,
            password: password,
        }

        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': "application/json"
            }
        });

        const data = await response.json();

        if (response.status === 201) {
            setLinksHidden(false);

            //store user info
            localStorage.setItem("_id", data.user._id);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("firstName", data.user.firstName);
            localStorage.setItem("lastName", data.user.lastName);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("isAdmin", data.user.isAdmin);
            localStorage.setItem("jwtToken", data.token);

            navigate('/dashboard');
        }
    }

    return (
        <div >
            <form className="max-w-sm mx-auto" onSubmit={handleAccountLogin}>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                </label>
                <input 
                type="text" 
                name="username" 
                id="username" 
                placeholder="Username" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                </label>
                <input 
                type="text" 
                name="password" 
                id="password" 
                placeholder="Password" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button type="submit" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Login
                </button>
            </form>
        </div>
    )
}