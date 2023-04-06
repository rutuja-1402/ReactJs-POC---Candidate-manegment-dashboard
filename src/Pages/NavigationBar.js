import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Logout from './Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React , {useState} from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';


function NavigationBar({setIsAddBtnClicked, setshowmodal, setshowedit}) { // this props are passed while calling the component in the file

    // const navigate = useNavigate();
    // const [showadd, setshowadd] = useState(false)

    // setshowadd=()=>{
    //     navigate('/Edit')
    // }
    return (
        <Navbar style={{backgroundColor:'#FCCF47'}}>
            <Container>
                <Navbar.Brand>New candidate<Button variant="text" onClick={() => { setshowmodal(false); setshowedit(false); setIsAddBtnClicked(true)}}> <PersonAddIcon></PersonAddIcon></Button></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Logout>Logout</Logout>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;