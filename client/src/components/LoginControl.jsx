import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LogoutButton from "./LogoutButton";

export default function LoginControl({ clearUser, setLinksHidden }) {
    const navigate = useNavigate();

    const [ isLoggedin, setLogin ] = useState(true);
        
        function handleLogoutClick() {
            setLogin(false);
            clearUser();
            navigate('/');
            setLinksHidden(true);
        }

        let button;

        if (isLoggedin) {
            button = <LogoutButton onClick={ handleLogoutClick } />
        }

        return (
            <div>
                { button }
            </div>
        )
}