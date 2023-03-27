import '../Pages/login.css'
import React, {useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Login() {
  const navigate = useNavigate();
  const googleAuth = JSON.parse(localStorage.getItem("auth")) || {};

  const responseMessage = (response) => {
    // debugger
     navigate('/Home');
     localStorage.setItem("auth", JSON.stringify(response));
    
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if(googleAuth.credential != undefined){   // means user is logged in rediect to home page to need to login
      return navigate("/home")
    }

  }, [])
  
  return (
    <div style={{position:'relative', bottom:-150 }}  >
      <Card className='logincard' sx={{ maxWidth:600, margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CardMedia
          component="img"
          alt="Login"
          height="140"
          image="https://templateyou.com/wp-content/uploads/2022/09/Free-Pure-CSS-Avatar-660x330.webp"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </Typography>
        </CardContent>
      </Card>
    </div>
    
  )
}
export default Login;


