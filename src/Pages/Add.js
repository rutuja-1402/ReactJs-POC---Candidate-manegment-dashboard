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
import { Link } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import { useFormik } from 'formik';
import Personaldatafrom from './Personaldatafrom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";



const From = ({ setstep , step, setfetchdata, setIsLoading}) => {
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
        new SlimSelect({
            select: '#multiple',
            // Array of Option objects
            data: [
                { text: 'drawing', value: 'value1' },
                { text: 'Reading', value: 'value2' },
                { text: 'Playing', value: 'value3' },
                { text: 'Travel', value: 'value4' },
                { text: 'Explore', value: 'value5' }
        ],
        
        })
    
    }, [step])

    
    const [education, setEducation] = useState([{ schoolName: '', yearOfGraduation: '' }]);

    const addEducation = () => {
        setEducation([...education, { schoolName: '', yearOfGraduation: '' }]);
    };

    const handleEducationChange = (event, index) => {
        const { name, value } = event.target;
        const list = [...education];
        list[index][name] = value;
        setEducation(list);
    };

    const removeEducation = (index) => {
        const list = [...education];
        list.splice(index, 1);
        setEducation(list);
    };


    const [skills, setSkills] = useState([{ skillName: '', experienceInMonths: '' }]);

    const addSkill = () => {
        setSkills([...skills, { skillName: '', experienceInMonths: '' }]);
    };

    const handleSkillChange = (event, index) => {
        const { name, value } = event.target;
        const list = [...skills];
        list[index][name] = value;
        setSkills(list);
    };

    const [numEntries, setNumEntries] = useState(1);

    function handleAddExperience() {
        setNumEntries(numEntries + 1);
    }


    const submitformdata=()=>{
        // alert("yes")
        setIsLoading(true);
        axios.post(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate`, submitdata).then((res)=>{
            Swal.fire(
                'Reccord Added Successfully',
            );
            getdata();
        console.log(res)
        setsubmitdata("");
        
        })
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

    switch (step) {
        case 1:
            return <Personaldatafrom setstep={setstep} step={step} setsubmitdata={setsubmitdata} submitdata={submitdata}></Personaldatafrom>

        case 2:
            return <div style={{ width: 'auto', margin: 'auto', textAlign: 'start', position: 'relative', top: '50px' }}>
                <h2>Education</h2>
                {education.map((edu, index) => {
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
                                            name="schoolName"
                                            value={edu.schoolName}
                                            onChange={(event) => handleEducationChange(event, index)}
                                        />
                                    </Form.Group></Col>
                                    <Col md={5}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Year of Graduation</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Year of Graduation"
                                                name="yearOfGraduation"
                                                value={edu.yearOfGraduation}
                                                onChange={(event) => handleEducationChange(event, index)}
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
            
            </div>
            case 3:
            return <div style={{ width: 'auto', margin: 'auto', textAlign: 'start', position: 'relative', top: '50px' }}>
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
                                                name="skillName"
                                                value={skill.skillName}
                                                onChange={(event) => handleSkillChange(event, index)}
                                            />
                                        </Form.Group>
                                </Col>
                                <Col md={5}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Experience in months</Form.Label>
                                            <DateRangePicker placeholder="Select Date Range" name="experienceInMonths"
                                                value={skill.experienceInMonths}
                                                onChange={(event) => handleSkillChange(event, index)} />
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
             </div>

             case 4:
            return <div style={{ width: 'auto', margin: 'auto', textAlign: 'start', position: 'relative', top: '50px' }}>
                <h2>Experience</h2>
                {[...Array(numEntries)].map((_, index) => (
                    <div key={index}>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" />
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control type="text" />

                        <Form.Label>Role</Form.Label>
                        <Form.Control type="text" />
                        <Form.Label>Duration Range in Months</Form.Label>
                        <br/>
                        <DateRangePicker
                            onChange={item => setdatepicker([item.selection])}
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            ranges={datepicker}
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
                    <Button variant='outline' onClick={handleAddExperience}><AddIcon></AddIcon></Button>
                )}
                {/* <Button variant='outline' type='submit' onClick={submitformdata}  >Submit</Button>  */}
            </div>


        default:
            break;
    }
}

function Add({setfetchdata, setIsLoading}) {
    const [step, setstep] = useState(1);

   

    useEffect(()=>{
        // debugger
        // console.log(getdata);
    },[])  // on component initialize, runs only one time of component render
    

    return (
        <div>
            <From setstep={setstep} step={step} setfetchdata={setfetchdata} setIsLoading={setIsLoading}></From>
            <div style={{position:'relative' ,top:'50px'}}>
                <Button variant="light" onClick={() => { if (step > 1) setstep(step - 1) }} disabled={(step === 1) ? true : false} style={{ marginRight: '10px' }}>Previous</Button>
                <Button variant="light" onClick={() => { if (step < 4) setstep(step + 1) }} disabled={(step === 4) ? true : false} style={(step === 4) ? { display:'none'} : undefined }>Next</Button>
                {(step === 4) && <Button variant='outline' type='submit'>Submit</Button> }
            </div>
        </div>
    )
}

export default Add
