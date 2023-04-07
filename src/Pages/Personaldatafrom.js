import React, { useState,useEffect } from "react"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Validation from "./Validation";
import '../Pages/scss.scss'
import '../Pages/login.css'
import Card from 'react-bootstrap/Card';
import SlimSelect from 'slim-select'


const Personaldatafrom = ({ setstep, step, setsubmitdata, submitdata, setselectdata })=>{

    const [errors, setErrors] = useState()
    // const initialValues={
    //     id:'',
    //     name:'',
    //     email:'',

    // }
    // const personaldetailChange=()=>{
    //   useFormik ({
    //     initialValues:initialValues,
    //     onSubmit:(values)=>{
    //         console.log(values)
    //     }
    //   })
    // }


    const [checkdata, setCheckdata] = useState(submitdata)
    // const [checkdata, setCheckdata] = useState({
    //     id: '',
    //     profile_picture: '',
    //     name: '',
    //     address: '',
    //     phone: "",
    //     email: "",
    //     gender: "",
    //     hobbies: [],
       
    // })


    const handlePersonalChange = (event) => {
        debugger
        setCheckdata({ ...checkdata, [event.target.name]: event.target.value })
        
        event.preventDefault()
        setErrors(Validation(checkdata)); 
    }
    
    const personaldataValidator=()=>{
        // alert("called")
        // const errors = validateForm();
        setErrors(Validation(checkdata, isMaleChecked = { isMaleChecked }, isFemaleChecked = { isFemaleChecked }));
        setsubmitdata(checkdata)
        
        // console.log(errors.email)
    }
    let [isMaleChecked, setIsMaleChecked] = useState(false);
    let [isFemaleChecked, setIsFemaleChecked] = useState(false);

    const handleMaleCheckboxChange = () => {
        // setCheckdata((prev)=>{
        //     return {...prev, "hobbies":newVal}
        // })
        setIsMaleChecked(!isMaleChecked);
    };

    const handleFemaleCheckboxChange = () => {
        setIsFemaleChecked(!isFemaleChecked);
    };

    useEffect(()=>{
        // debugger
        debugger
        setCheckdata({...checkdata, ...submitdata});
        let select = new SlimSelect({
          select: "#multiple",
          // Array of Option objects
          data: [
            { text: "Drawing", value: "Drawing" },
            { text: "Reading", value: "Reading" },
            { text: "Playing", value: "Playing" },
            { text: "Travel", value: "Rravel" },
            { text: "Explore", value: "Explore" },
            { text: "Music", value: "Music" },
          ],
          events: {
            afterChange: (newVal) => {
                let selectedOption = [];
                newVal.forEach(element => {
                    if((typeof element).toString() === "string"){
                        selectedOption.push(element)
                    }else{
                        selectedOption.push(element.value)              
                    }
                });
                setCheckdata((prev)=>{
                    
                    return {...prev, "hobbies":selectedOption}
                })

            //   console.log(newVal);
            },
          },
        });
        let selectedOption = [];
        submitdata?.hobbies.forEach(element => {
            if((typeof element).toString() === "string"){
                selectedOption.push(element)
            }else{
                selectedOption.push(element.value)              
            }
        });
        debugger
        if (step == 1) select.setSelected(selectedOption);
        // if (step == 1) select.setSelected(submitdata?.hobbies || checkdata?.hobbies || []);
        // setTimeout(()=>{
                debugger
            setErrors(Validation(submitdata)); 
        // },[500])
    },[submitdata])
return(
    <Card style={{ border: '1px solid black'}}>
        <Card.Body>

        <div id='personal_info' style={{ width: 'auto', margin: 'auto', textAlign: 'start'}}>
            <h2>Personal Details</h2>
            <Form >
                <InputGroup hasValidation>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" placeholder="id is auto generated" name="id" required value={checkdata.id} readOnly={true} />
                        {errors?.id && <span style={{ color: 'red' }} >*{errors.id}</span>}
                    </Form.Group>
                </InputGroup>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type="file" accept="image/png, image/jpeg" placeholder="" name='profile_photo' />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" name='name' value={checkdata.name} onChange={(event) => handlePersonalChange(event)} />
                    {errors?.name && <span style={{ color: 'red' }} >*{errors.name}</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' value={checkdata.email} onChange={(event) => handlePersonalChange(event)} />
                    {errors?.email && <span style={{ color: 'red' }} >*{errors.email}</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label>Select Gender</Form.Label>
                    <br />
                    <input type="radio" id="male" name="gender" value={"Male"} checked={checkdata.gender == "Male" ? true : false} onChange={(event) => handlePersonalChange(event)} />
                    <label for="male">Male</label><br />
                    <input type="radio" id="Female" name="gender" value={"Female"} checked={checkdata.gender == "Female" ? true : false}  onChange={(event) => handlePersonalChange(event)} />
                    <label for="female">Female</label><br />
                    {errors?.gender && <span style={{ color: 'red' }} >*{errors.gender}</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label>Select your hobbies</Form.Label>
                    <select id="multiple" multiple name="hobbies" onChange={(event) => {
                        debugger
                    }} >
                        <option value="value1" name='' >please select....</option>
                    </select>
                </Form.Group>
         
                <Card.Footer style={{border:'none',background:'none',textAlign:'end'}}>
                        <div >
                            <div className="neon_border">
                                <span>
                                    <Button className="custom-button" onClick={() => { if (step > 1) setstep(step - 1) }} disabled={(step === 1) ? true : false} style={{ marginRight: '10px' }}>Previous</Button>
                                </span>
                            </div>
                            <div className="neon_border">
                                <span>
                                    <Button className="custom-button" onClick={() => { if (step < 4) { setstep(step + 1); personaldataValidator(); } }} disabled={(errors && Object.keys(errors).length === 0) ? false : true} style={(step === 4) ? { display: 'none' } : undefined} >Next</Button>
                                </span>
                            </div>
                            {(step === 4) && <Button variant='outline' type='submit'>Submit</Button>}
                        </div>
                </Card.Footer>
            </Form>

        </div>

        </Card.Body>
    </Card>
)
};


export default Personaldatafrom;