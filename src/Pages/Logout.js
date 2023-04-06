import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Button from '@mui/material/Button';

function Logout() {
    const [name, setName] = useState(null)

    const googleAuth = JSON.parse(localStorage.getItem("auth")) || {};
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/");
    }

    useEffect(() => {
        if (googleAuth.credential == undefined) {  //user is not login, user must login first
            return navigate("/")
        }
        const user = jwtDecode(googleAuth.credential);  // get logged in user details with the token
        setName(user.name)

    }, [])

    return (
        <div>
            <span className='me-3' style={{textTransform:'uppercase', color:'black'}} >Welcome {name}</span>
            <Button style={{color:'black'}} variant="outlined" color="error" onClick={() => handleLogOut()}>logout</Button>
        </div>
    )
}

export default Logout