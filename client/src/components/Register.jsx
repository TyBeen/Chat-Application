import { useNavigate } from "react-router-dom"

export default function Register() {
    const navigate = useNavigate();

    async function handleAccountCreation(e) {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;

        const body = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email
        }

        console.log(username);
        console.log(password);
        console.log(firstName);
        console.log(lastName);
        console.log(email);

        const response = await fetch("http://localhost:3000/users/register", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': "application/json"
            }
        });

        const data = await response.json();
        console.log(data);

        navigate("/Login")

    }

    return (
        <div >
            <form className="max-w-sm mx-auto" onSubmit={handleAccountCreation}>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                </label>
                <input type="text" name="username" id="username" placeholder="Username" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                </label>
                <input type="text" name="password" id="password" placeholder="Password" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    First Name
                </label>
                <input type="text" name="firstName" id="firstName" placeholder="John" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Last Name
                </label>
                <input type="text" name="lastName" id="lastName" placeholder="Doe" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    EMail
                </label>
                <input type="email" name="email" id="email" placeholder="JohnDoe@gmail.com" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button type="submit" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Create Account
                </button>
            </form>
        </div>
    )
}
