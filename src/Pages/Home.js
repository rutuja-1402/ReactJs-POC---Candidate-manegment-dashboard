import React, { useEffect, useState, useRef } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiEyeCheckOutline } from '@mdi/js';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import NavigationBar from './NavigationBar';
import '../Pages/login.css'
import { useParams, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import CreateIcon from '@mui/icons-material/Create';
// import Edit from './Edit';
import Modal from 'react-bootstrap/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import Stack from '@mui/material/Stack';
import Add from "../Pages/Add";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import InterestsIcon from '@mui/icons-material/Interests';
import Face3Icon from '@mui/icons-material/Face3';
import FaceIcon from '@mui/icons-material/Face';



//implementation of page loader

function PageLoader({isLoading}) {
    return (
      <div>
        {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }


//Home component

function Home() {

    const [fetchdata, setfetchdata] = useState([])//state to store fetch data
    const [selectdata , setselectdata]= useState([])// to get data
    
    //storing login cre. in local storage
    const googleAuth = JSON.parse(localStorage.getItem("auth")) || {};
    const navigate = useNavigate();

    const [showmodal, setshowmodal]=useState(false)//state to display data
    const [showedit, setshowedit] = useState(false)
    // const [userDetailsForEditModal, setUserDetailsForEditModal] = useState({userEmail:null,userId:null,userName:null});
    const [editdatamodal, seteditdatamodal] = useState({
        id:'',
        name: '',
        address: '',
        phone: '',
        email: '',
    
    });
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
    const [isEditBtnClicked, setIsEditBtnClicked] = useState({show:false,data:[]});
    const [isLoading, setIsLoading] = useState(true);
 
    const profilepicture=selectdata.profile_picture

    const { id } = useParams();

    const showdata=(id)=>{
    // alert(id);
        axios.get(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`).then((ans)=>{
            setselectdata(ans.data)
            console.log(ans.data)
        })
    }

    //Modal Compoent to diplay data when list is clicked
    const ModalComponent=()=>{
        return (
            <div
                className="modal show custom-modal"
                style={{ display: 'block', position: 'initial'}}>
                <Modal.Dialog style={{ boxShadow: '0px 0px 10px black'}}>
                    <Modal.Header closeButton onClick={() => setshowmodal(false)}> 
                        <Modal.Title>
                             <Stack direction="row" spacing={4} >
                                <Avatar style={{
                                    border: '2px solid black', height:'100px',width:'100px'}} src={profilepicture} />
                                <h2 style={{ margin: 'auto', position: 'relative', right: '-34px', color: 'black', fontWeight:'unset'}}> {selectdata.name}</h2>
                             </Stack>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div style={{display:'flex'}}>
                            <div>
                                {/* <h2>Personal info</h2> */}
                                <ListGroup variant="flush"style={{textAlign:'justify'}} >
                                    <ListGroup.Item><PersonIcon />:{(selectdata.name) != "" ? selectdata.name :<strong style={{color:'red'}}>Not available</strong>}</ListGroup.Item>
                                    <ListGroup.Item><LocationOnIcon />:{(selectdata.address)!= "" ? selectdata.address : <strong style={{ color: 'red' }}>Not available</strong>}</ListGroup.Item>
                                    <ListGroup.Item><PhoneIcon />:{(selectdata.phone) != "" ? selectdata.phone : <strong style={{ color: 'red' }}>Not available</strong>}</ListGroup.Item>
                                    <ListGroup.Item>{(selectdata.gender) === 'Female' ? <Face3Icon /> : <FaceIcon />}:{(selectdata.gender) != "" ? selectdata.gender:<strong style={{ color: 'red' }}>Not available</strong>}</ListGroup.Item>
                                    <ListGroup.Item><InterestsIcon />:{(selectdata.hobbies) != "" ? selectdata.hobbies : <strong style={{ color: 'red' }}>Not available</strong>}</ListGroup.Item>
                                    {/* <ListGroup.Item>{selectdata.gender}</ListGroup.Item> */}
                                </ListGroup>
                            </div>
                            <div className='Education'>
                                <div >
                                    {/* <h3>Education</h3> */}
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Institute Name</th>
                                                <th>Year of passing</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                             {
                                              selectdata?.education &&  selectdata.education.map((education) => {
                                                    console.log(education)
                                                    return (
                                                        <tr>
                                                            <td>{education.institute}</td>
                                                            <td>{education.pass_out_year}</td>
                                                        </tr>
                                                    )
                                                })
                                             }
                                        </tbody>
                                    </Table>
                                </div>
                                <div className='Skill'>
                                    {/* <h3>Skills</h3> */}
                                    <Table striped bordered hover size="sm" >
                                        <thead>
                                            <tr>
                                                <th>Skill</th>
                                                <th>Experience in months</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                             {
                                              selectdata?.skills &&  selectdata.skills.map((skill) => {
                                                    console.log(skill)
                                                    return (
                                                        <tr>
                                                            <td>{skill.name}</td>
                                                            <td>{skill.experience}</td>
                                                        </tr>
                                                    )
                                                })
                                             }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setshowmodal(false)} >Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }


const Edit =({editdatamodal, setfetchdata})=>{
    const [editdata, seteditdata] = useState({
        id:'',
        name: '',
        address: '',
        phone: '',
        email: '',
    
    });
    const submitBtn = useRef(null);

    // const inputeHandler=(event)=>{
    //     seteditdata({...editdata ,[event.target.name]:event.target.value})
    // }

    const onsubmit=(event)=>{
        event.preventDefault();
        setIsLoading(true);
        if(submitBtn != null){
            submitBtn.current.disabled = true;
        }
        console.log(editdata)
        axios.put(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${editdata.id}`,editdata).then(() => {
            // window.alert("record update successfully")
            toast(
                'Reccord Added Successfully',
            )
            setfetchdata(prev=>{
                let index = prev.findIndex(user => user.id == editdata.id);
                if(index > -1){
                    prev[index] = {...prev[index] , ...editdata};

                }
                
                return [...prev];
            }
            );
            setIsLoading(false);
            if(submitBtn != null){
                submitBtn.current.disabled = false;
            }

        });

    }

    useEffect(()=>seteditdata(editdatamodal),[])

    return(
        <div style={{width:'100%', textAlign:'start'}}>
            <Form onSubmit={onsubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter id" value={editdata.id} readonly={true} disabled={true} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={editdata.email} onChange={(e)=>{
                        const  user = editdata;
                        user.email = e.target.value;
                        seteditdata({...user});

                    }}  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name"value={editdata.name} onChange={(e)=>{
                        const  user = editdata;
                        user.name = e.target.value;
                        seteditdata({...user});

                    }} />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button ref={submitBtn} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

    const deletid = (id) => {
        if (window.confirm("ARE YOU SURE WANT TO DELETE")) {
            setIsLoading(true);
            axios.delete(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`).then(() => {
                toast(
                    'Reccord Deleted Successfully',
                )
                getdata();
            })
        }
    }

    const getdata=()=>{
        axios.get("https://60d5a2c2943aa60017768b01.mockapi.io/candidate").then((res) => {
            setfetchdata(res.data);
            setIsLoading(false);
        })
    }
    
    useEffect(()=>{
        // debugger
      if(googleAuth.credential == undefined){ 
           return navigate("/")
        }//user is not login, user must login first,
         
        getdata();
  },[])

    return (
        <div >
            <NavigationBar  setIsEditBtnClicked={setIsEditBtnClicked} setIsAddBtnClicked={setIsAddBtnClicked} setshowmodal={setshowmodal}></NavigationBar>
            <Container style={{
                position: 'relative',
                right:'30px',
                top:'40px'}} >
        <Row>
                    <Col sm={4} style={{
                        height: '500px',
                        overflowY: 'scroll',
                        overflowX:'hidden'}} >
                    {isLoading && <PageLoader isLoading={isLoading}></PageLoader>}
                        { !isLoading &&
                            fetchdata.map((details)=>{
                                const { profile_picture, name, id, email}=details
                                return(
                                    <List sx={{ width: '100%', maxWidth: 360 }} >
                                        <ListItem className='listitem ' onClick={() => { seteditdatamodal({
                                                                                    id:id,
                                                                                    name: name,
                                                                                    address: '',
                                                                                    phone: '',
                                                                                    email: email,
                                                                                    education:[]
                                                                                
                                            })}}>
                                            <ListItemAvatar>
                                                <Avatar style={{ border: '2px solid white' }}>
                                                   <img src={profile_picture}  ></img>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText className='listdata' primary={name} style={{color:'black'}} onClick={() => { setshowmodal(true); setshowedit(false); showdata(id); setIsAddBtnClicked(false); setIsEditBtnClicked(prev=>{return {...prev, show:false}}) }}/>
                                            <CreateIcon onClick={() => { setIsEditBtnClicked({
                                                                                    show:true,
                                                                                    data:details}); setshowedit(true); setshowmodal(false); setIsAddBtnClicked(false)}}  ></CreateIcon>
                                            <DeleteIcon onClick={() => deletid(id)}></DeleteIcon>
                                        </ListItem>
                                    </List>
                                )
                            })
                        }
                    </Col>
                    
        <Col sm={8}>
                        {showmodal && <ModalComponent></ModalComponent>}
                        {/* {showedit && <Edit editdatamodal={editdatamodal} fetchdata={fetchdata} setfetchdata={setfetchdata}></Edit>} */}
                        {isAddBtnClicked && <Add  setfetchdata={setfetchdata} setIsLoading={setIsLoading} setselectdata={setselectdata} ></Add>}
                        {isEditBtnClicked.show && <Add setfetchdata={setfetchdata} setIsLoading={setIsLoading} userData={isEditBtnClicked.data} ></Add>}

        </Col>
      </Row>
    </Container>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Home