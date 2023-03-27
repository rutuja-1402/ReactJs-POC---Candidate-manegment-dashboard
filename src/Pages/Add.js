import React ,{useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SlimSelect from 'slim-select'
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import { DateRangePicker } from 'react-date-range';
import axios from 'axios';
import Swal from 'sweetalert2'



const From = ({step, setfetchdata, setIsLoading}) => {
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
    const handlePersonalChange=(event)=>{
        debugger
        setsubmitdata({ ...submitdata, [event.target.name]: event.target.value })

    }
    const[submitdata,setsubmitdata]=useState({
        id:'',
        profile_picture:'',
        name:'',
        address:'',
        phone: "", 
        email: "", 
        gender: "",
        hobbies: [], 
        education: [],
        skills:[], 
        experience:[]
    })

    const submitformdata=()=>{
        // alert("yes")
        setIsLoading(true);
        axios.post(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate`, submitdata).then((res)=>{
            Swal.fire(
                'Reccord Added Successfully',
            );
            getdata();
        console.log(res)
        
        })
    }



    switch (step) {
        case 1:
            return <div style={{ width: 'auto',margin:'auto', textAlign: 'start' ,position:'relative' , top:'50px'}}>
                <h2>Personal Details</h2>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter id" name="id" value={submitdata.id} onChange={(event) => handlePersonalChange(event)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Photo</Form.Label>
                        <Form.Control type="file" placeholder="" name='profile_photo' value={submitdata.profile_picture} onChange={(event) => handlePersonalChange(event)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" name='name' value={submitdata.name} onChange={(event) => handlePersonalChange(event)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' value={submitdata.email} onChange={(event) => handlePersonalChange(event)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Select Gender</Form.Label>
                        <br/>
                        <input type="radio" id="male" name="male" value={submitdata.gender} onChange={(event) => handlePersonalChange(event)} />
                            <label for="male">Male</label><br/>
                                <input type="radio" id="Female" name="female" value="Female"/>
                                    <label for="female">Female</label><br/>
        </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Select your hobbies</Form.Label>
                        <select id="multiple" multiple value={submitdata.hobbies} name="hobbies" onChange={(event) => handlePersonalChange(event)} >
                        <option value="value1" name='value' >please select ....</option>
                        </select>

                    </Form.Group>
                </Form>
            </div>

        case 2:
            return <div style={{ width: 'auto', margin: 'auto', textAlign: 'start', position: 'relative', top: '50px' }}>
                <h2>Education</h2>
                {education.map((edu, index) => {
                    return (
                        <div key={index}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name of School/College/Institute</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Name of School/College/Institute"
                                name="schoolName"
                                value={edu.schoolName}
                                onChange={(event) => handleEducationChange(event, index)}
                            />
                            </Form.Group>
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
                             <div>
                                {index !== 0 && (
                                    <Tooltip title='Click to remove inpute filed'>
                                        <Button variant='outline' onClick={() => removeEducation(index)}><RemoveCircleOutlineIcon></RemoveCircleOutlineIcon></Button>
                                    </Tooltip>
                                )}
                            </div>
                        </div>
                    );
                })}
                <Tooltip title="Click to add more inpute">
                     <Button variant='outline' onClick={addEducation}><AddIcon ></AddIcon></Button>
                </Tooltip>
            </div>
            case 3:
            return <div style={{ width: 'auto', margin: 'auto', textAlign: 'start', position: 'relative', top: '50px' }}>
                <h2>Skills</h2>
                {skills.map((skill, index) => {
                    return (
                        <div key={index}>
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
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Experience in months</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Experience in months"
                                name="experienceInMonths"
                                value={skill.experienceInMonths}
                                onChange={(event) => handleSkillChange(event, index)}
                            />
                            </Form.Group>
                            <div>
                                
                                    {index !== 0 && (
                                    <Tooltip title='Click to remove inpute filed'>
                                        <Button variant='outline' onClick={() => setSkills(skills.filter((s, i) => i !== index))}>
                                            <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
                                        </Button>
                                    </Tooltip>
                                    )}
                                </div>
                        </div>
                    );
                })}
                <Tooltip title='Click here to add inpute '>
                <Button variant='outline' onClick={addSkill}>
                        <AddIcon></AddIcon>
                </Button>
                </Tooltip>
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

                <Button variant='outlinr' type='submit' onClick={submitformdata}  >Submit</Button> 
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
            <From step={step} setfetchdata={setfetchdata} setIsLoading={setIsLoading}></From>
            <div style={{position:'relative' ,top:'50px' }}>
                <Button variant="outlined" onClick={() => { if(step > 1)  setstep(step - 1) }}>Previous</Button>
                <Button variant="outlined" onClick={() => { if(step < 4) setstep(step + 1) }}>Next</Button>
            </div>
        </div>
    )
}

export default Add
