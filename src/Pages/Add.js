import React ,{useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SlimSelect from 'slim-select'
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';
// import { DateRangePicker } from 'react-date-range';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link, Navigate } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import { useFormik } from 'formik';
import Personaldatafrom from './Personaldatafrom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import EducationDeatils from './EducationDeatils';
import Validation from "./Validation";
import '../Pages/scss.scss'
import '../Pages/login.css'
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';

const From = ({ setstep, step, setfetchdata, setIsLoading, userData, setselectdata }) => {
    const [datepicker, setdatepicker] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);

          
    const getdata=()=>{
       
        axios.get("https://60d5a2c2943aa60017768b01.mockapi.io/candidate").then((res) => {
            setfetchdata(res.data)
            setIsLoading(false);
        })
    }

      useEffect(() => {
        debugger
        // let select = new SlimSelect({
        //     select: '#multiple',
        //     // Array of Option objects
        //     data: [
        //         { text: 'Drawing', value: 'Drawing' },
        //         { text: 'Reading', value: 'Reading' },
        //         { text: 'Playing', value: 'Playing' },
        //         { text: 'Travel', value: 'Rravel' },
        //         { text: 'Explore', value: 'Explore' },
        //         { text: 'Music', value: 'Music' },
        // ],
        
        // });
        // if(step == 1)   select.setSelected(userData?.hobbies || [])
    
    }, [step])

    
    const [education, setEducation] = useState([{ institute: '', pass_out_year: '' }]);

    const addEducation = () => {
        setEducation([...education, { institute: '', pass_out_year: '' }]);
    };

    const handleEducationChange = (event, index) => {
        const { name, value } = event.target;
        const list = [...education];
        list[index][name] = value;
        setsubmitdata((prev)=>{
            return {...prev, "education":list}
        })
        setEducation(list);
    };

    const removeEducation = (index) => {
        const list = [...education];
        list.splice(index, 1);
        setEducation(list);
    };


    const [skills, setSkills] = useState([{ name: '', experience: '' }]);
    const [experienceDetails, setExperienceDetails] = useState([{
        "company": "",
        "project": "",
        "role": "",
        "team_size": 1,
        "duration_from": "",
        "duration_to": ""
    }]);

    const addSkill = () => {
        setSkills([...skills, { name: '', experience: '' }]);
    };


    const handleSkillChange = (event, index, config = { isDatePicker: false, name: "" }) => {
        debugger
        const list = [...skills];
        if (config.isDatePicker) {
            const name = config.name;
            list[index][name] = event;  // event => value for datepicker
            setSkills(list);

        } else {
            const { name, value } = event?.target;
            list[index][name] = value;
            setSkills(list);
        }

        setsubmitdata((prev)=>{
            return {...prev, "skills":list}
        })
        console.log(skills)
    };

    const handleExperienceChange = (event, index, config = { isDatePicker: false }) => {
        debugger
        const list = [...experienceDetails];
        if (config.isDatePicker) {
            let duration_to = "", duration_from = "";
            if(event != null){ // event is value
                let formatedDurationToDate = event[1].toDateString().split(" ");
                let formatedDurationfromDate = event[0].toDateString().split(" ");
                // formatted to month and year
                duration_to = `${formatedDurationToDate[1]} ${formatedDurationToDate[3]}`;
                duration_from = `${formatedDurationfromDate[1]} ${formatedDurationfromDate[3]}`;
                list[index]["duration_to"] = duration_to; 
                list[index]["duration_from"] = duration_from;
            }else{
                list[index]["duration_to"] = "Jan 2023";
                list[index]["duration_from"] = "Jan 2023";
            }
            // list[index][name] = event;  // event => value for datepicker
            // setExperienceDetails(list);

        } else {
            const { name, value } = event?.target;
            // const list = [...experienceDetails];
            list[index][name] = value;
            setExperienceDetails(list);
        }

        setsubmitdata((prev)=>{
            return {...prev, "experience":list}
        })
        console.log(experienceDetails)
    };

    const [numEntries, setNumEntries] = useState(1);

    function handleAddExperience() {
        setNumEntries(numEntries + 1);
    }


    const submitformdata=()=>{


        // alert("yes")
debugger
        // return
        setIsLoading(true);
        if(submitdata.id != "" && submitdata.id != null){  // update the user data
            axios.put(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${submitdata.id}`, submitdata).then((res)=>{
                
            toast(
                    'Record Updated Successfully',
                );
                getdata();
            console.log(res)
            setsubmitdata({
                id: '',
                profile_picture: '',
                name: '',
                address: '',
                phone: "",
                email: "",
                gender: "",
                hobbies: [],
                education: [],
                skills: [],
                experience: []
            });

            
            })
        }else{
            axios.post(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate`, submitdata).then((res)=>{
                toast(
                    'Record Added Successfully',
                );
                getdata();
            console.log(res)
            setsubmitdata({
                id: '',
                profile_picture: '',
                name: '',
                address: '',
                phone: "",
                email: "",
                gender: "",
                hobbies: [],
                education: [],
                skills: [],
                experience: []
            });
            })
        }
       


    }

    const [submitdata, setsubmitdata] = useState({
        id: '',
        profile_picture: '',
        name: '',
        address: '',
        phone: "",
        email: "",
        gender: "",
        hobbies: [],
        education: [],
        skills: [],
        experience: []
    })

    const [eduerrors, setEduerrors] = useState()

    // const educationValidator = () => {
    //     alert("called")
    //     // const errors = validateForm();
    //     setEduerrors(Validation(education));
    // }

    useEffect(()=>{
        if(userData != null || userData != undefined){
            setsubmitdata({...submitdata, ...userData})
            debugger
            console.log()
            console.log(submitdata)
            setEducation(userData.education)
            setSkills(userData.skills)
            setExperienceDetails(userData.experience)
            setNumEntries(userData.experience.length)
        }
    },[userData])

    switch (step) {
        case 1:
            return <Personaldatafrom setselectdata={setselectdata} setstep={setstep} step={step} setsubmitdata={setsubmitdata} submitdata={submitdata}></Personaldatafrom>

        case 2:
            // return <EducationDeatils setstep={setstep} step={step} education={education} set={setEducation}></EducationDeatils>
            return <Card>
                <Card.Body>
                    <div style={{ width: 'auto', margin: 'auto', textAlign: 'start' }}>
                        <h2>Education</h2>
                        {education && education.map((edu, index) => {
                            return (
                                <div key={index}>
                                    <Container>
                                        <Row>
                                            <Col md={5} >
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Name of Institute</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Name of School/College/Institute"
                                                        name="institute"
                                                        value={edu.institute}
                                                        onChange={(event) => handleEducationChange(event, index)}
                                                        required
                                                    />
                                                    {/* {eduerrors?.institute && <span style={{ color: 'red' }} >*{eduerrors.institute}</span>} */}
                                                </Form.Group></Col>
                                            <Col md={5}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Year of Graduation</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Year of Graduation"
                                                        name="pass_out_year"
                                                        value={edu.pass_out_year}
                                                        onChange={(event) => handleEducationChange(event, index)}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={1} > <Tooltip title="Click to add more inpute">
                                                <Button variant='outline' onClick={addEducation}><AddIcon ></AddIcon></Button>
                                            </Tooltip>
                                            </Col>
                                            <Col md={1}>  <div>
                                                {index !== 0 && (
                                                    <Tooltip title='Click to remove inpute filed'>
                                                        <Button variant='outline' onClick={() => removeEducation(index)}><RemoveCircleOutlineIcon></RemoveCircleOutlineIcon></Button>
                                                    </Tooltip>
                                                )}
                                            </div></Col>

                                        </Row>
                                    </Container>

                                </div>
                            );
                        })}
                        <Card.Footer style={{ border: 'none', background: 'none', textAlign: 'end' }}>
                            <div>
                            <div className="neon_border">
                                <span>
                                    <Button className="custom-button" onClick={() => { if (step > 1) setstep(step - 1) }} disabled={(step === 1) ? true : false} style={{ marginRight: '10px' }}>Previous</Button>
                                </span>
                            </div>
                            <div className="neon_border">
                                <span>
                                    <Button className="custom-button" onClick={() => { if (step < 4) { setstep(step + 1) } }} style={(step === 4) ? { display: 'none' } : undefined} >Next</Button>
                                </span>
                            </div>
                            {(step === 4) && <Button variant='outline' type='submit'>Submit</Button>}
                        </div>
                        </Card.Footer>
                        </div>
                </Card.Body>
            </Card>
        case 3:
            return <Card>
                <Card.Body>
             <div style={{ width: 'auto', margin: 'auto', textAlign: 'start' }}>
                <h2>Skills</h2>
                {skills.map((skill, index) => {
                    return (
                        <div key={index}>
                        <Container>
                            <Row>
                                <Col md={5}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Name Of Skill</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Name of Skill"
                                                name="name"
                                                value={skill.name}
                                                onChange={(event) => handleSkillChange(event, index)}
                                            />
                                        </Form.Group>
                                </Col>
                                <Col md={5}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Experience in years</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Name of Skill"
                                                name="experience"
                                                value={skill.experience}
                                                onChange={(event) => handleSkillChange(event, index)}
                                            />
                                            {/* <DateRangePicker placeholder="Select Date Range" name="experience"
                                                value={skill.experience}
                                                onChange={(event) => handleSkillChange(event, index)} /> */}
                                            {/* <DateRangePicker placeholder="Select Date Range" name="experience"
                                                value={skill.experience}
                                                onChange={(event) => handleSkillChange(event, index, { isDatePicker: true, name: "experience" })} /> */}
                                        </Form.Group>
                                </Col>
                                <Col md={1}>
                                        <Tooltip title='Click here to add inpute '>
                                            <Button variant='outline' onClick={addSkill}>
                                                <AddIcon></AddIcon>
                                            </Button>
                                        </Tooltip>
                                </Col>
                                <Col md={1}>
                                        <div>
                                            {index !== 0 && (
                                                <Tooltip title='Click to remove inpute filed'>
                                                    <Button variant='outline' onClick={() => setSkills(skills.filter((s, i) => i !== index))}>
                                                        <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
                                                    </Button>
                                                </Tooltip>
                                            )}
                                        </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    );
                })}
                <Card.Footer style={{ border: 'none', background: 'none', textAlign: 'end' }}>
                    <div >
                        <div className="neon_border">
                            <span>
                                <Button className="custom-button" onClick={() => { if (step > 1) setstep(step - 1) }} disabled={(step === 1) ? true : false} style={{ marginRight: '10px' }}>Previous</Button>
                            </span>
                        </div>
                        <div className="neon_border">
                            <span>
                                {(step === 4) && <Button type='submit'>Submit</Button>}
                                <Button className="custom-button" onClick={() => { if (step < 4) { setstep(step + 1) } }} style={(step === 4) ? { display: 'none' } : undefined} >Next</Button>
                            </span>
                        </div>
                    </div>
                </Card.Footer>
             </div>
 </Card.Body >
            </Card >
             case 4:
            return <Card>
                <Card.Body><div style={{ width: 'auto', margin: 'auto', textAlign: 'start' }}>
                <h2>Experience</h2>
                {[...Array(numEntries)].map((_, index) => (
                //    submitdata.experience.map(()=>{

                //    }) 
                   <div key={index}>
                        <Form.Label>Company Name {index}</Form.Label>
                        <Form.Control type="text" name="company" value={experienceDetails[index]?.company} 
                         onChange={(event) => handleExperienceChange(event, index)}
                        />
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control type="text" name='project' value={experienceDetails[index]?.project} onChange={(event) => handleExperienceChange(event, index)} />

                        <Form.Label>Role</Form.Label>
                        <Form.Control type="text" name='role' value={experienceDetails[index]?.role} onChange={(event) => handleExperienceChange(event, index)} />
                        <Form.Label>Duration Range in Months</Form.Label>
                        <br/>
                        <DateRangePicker
                            // onChange={item => setdatepicker([item.selection])}
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            // ranges={datepicker}
                            defaultValue={[
                                new Date((experienceDetails[index]?.duration_from )|| new Date),
                                new Date((experienceDetails[index]?.duration_to) || new Date),
                            ]}

                            onChange={(event) => handleExperienceChange(event, index,{ isDatePicker: true })}
                            // value={new Date()}
                            />
                        <hr />
                        <div>

                            {index !== 0 && (
                                <Tooltip title='Click to remove inpute filed'>
                                    <Button variant='outline' onClick={() => setNumEntries(numEntries -1) }>
                                        <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
                                    </Button>
                                </Tooltip>
                            )}
                        </div>
                    </div>
                ))}
                {numEntries < 10 && (
                    <Button  variant='outline' onClick={handleAddExperience}><AddIcon></AddIcon></Button>
                )}
                {/* <Button variant='outline' type='submit' onClick={submitformdata}  >Submit</Button>  */}
                    <Card.Footer style={{ border: 'none', background: 'none', textAlign: 'end' }}>
                        <div>
                            <div className="neon_border">
                                <span>
                                    <Button className="custom-button" onClick={() => { if (step > 1) setstep(step - 1) }} disabled={(step === 1) ? true : false} style={{ marginRight: '10px' }}>Previous</Button>
                                </span>
                            </div>
                            <div className="neon_border">
                                <span>
                                    {(step === 4) && <Button className="custom-button"  type='submit' onClick={submitformdata}>Submit</Button>}
                                    <Button className="custom-button" onClick={() => { if (step < 4) { setstep(step + 1) } }} style={(step === 4) ? { display: 'none' } : undefined} >Next</Button>
                                </span>
                            </div>
                        </div>
               </Card.Footer>
            </div>
                </Card.Body >
            </Card >
        default:
            break;
    }
}

function Add({setfetchdata, setIsLoading, userData}) {
    const [step, setstep] = useState(1);

    useEffect(()=>{
        // debugger
        console.log(userData);
    },[])  // on component initialize, runs only one time of component render
    

    return (
        <div>
            <From  setstep={setstep} step={step} setfetchdata={setfetchdata} setIsLoading={setIsLoading} userData={userData}></From>
            {/* <div style={{ position: 'relative', top: '50px' }}>
                <Button  onClick={() => { if (step > 1) setstep(step - 1) }} disabled={(step === 1) ? true : false} style={{ marginRight: '10px' }}>Previous</Button>
                <Button  onClick={() => { if (step < 4) { setstep(step + 1) } }} style={(step === 4) ? { display: 'none' } : undefined} >Next</Button>
                {(step === 4) && <Button variant='outline' type='submit'>Submit</Button>}
            </div> */}
        </div>
    )
}

export default Add
