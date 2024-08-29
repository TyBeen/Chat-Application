import LoginControl from './LoginControl';

export default function Welcome({ clearUser, userData, setLinksHidden }) {

    //header welcoming user by name
    const firstname = userData.firstName;

    return (
        <div className="flex">
        <span>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Welcome,
            </span> 
            {firstname}!
            </h1>
        </span>
        <LoginControl clearUser={clearUser} setLinksHidden={setLinksHidden} />
        
        </div>
    )
}