import React, { useState,useEffect } from "react"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Validation from "./Validation";

const Personaldatafrom = ({setstep, step,setsubmitdata ,submitdata})=>{

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
        setErrors(Validation(checkdata)); //like this .?  yleopl yep

    }
   
    const personaldataValidator=()=>{
        // alert("called")
        // const errors = validateForm();
        setErrors(Validation(checkdata, isMaleChecked = { isMaleChecked }, isFemaleChecked = { isFemaleChecked }));
        
        // console.log(errors.email)
    }
    let [isMaleChecked, setIsMaleChecked] = useState(false);
    let [isFemaleChecked, setIsFemaleChecked] = useState(false);

    const handleMaleCheckboxChange = () => {
        setIsMaleChecked(!isMaleChecked);
    };

    const handleFemaleCheckboxChange = () => {
        setIsFemaleChecked(!isFemaleChecked);
    };

    useEffect(()=>{
        debugger
        setCheckdata({...checkdata, ...submitdata});
    },[])
return(
    
        <div id='personal_info' style={{ width: 'auto', margin: 'auto', textAlign: 'start', position: 'relative', top: '50px' }}>
            <h2>Personal Details</h2>
            <Form >
                <InputGroup hasValidation>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter id" name="id" required value={checkdata.id} onChange={(event) => handlePersonalChange(event)} />
                        {errors?.id && <span style={{ color: 'red' }} >*{errors.id}</span>}
                    </Form.Group>
                </InputGroup>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type="file" accept="image/png, image/jpeg" placeholder="" name='profile_photo' value={checkdata.profile_picture} onChange={(event) => handlePersonalChange(event)} />
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
                    <input type="radio" id="male" name="male" value={checkdata.gender} checked={isMaleChecked} onChange={handleMaleCheckboxChange} />
                    <label for="male">Male</label><br />
                    <input type="radio" id="Female" name="female" value={checkdata.gender} checked={isFemaleChecked} onChange={handleFemaleCheckboxChange} />
                    <label for="female">Female</label><br />
                    {errors?.gender && <span style={{ color: 'red' }} >*{errors.gender}</span>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label>Select your hobbies</Form.Label>
                    <select id="multiple" multiple value={checkdata.hobbies} name="hobbies" onChange={(event) => handlePersonalChange(event)} >
                        <option value="value1" name='' >please select....</option>
                    </select>
                </Form.Group>
            </Form>
            <div style={{ position: 'relative', top: '50px' }}>
                <Button variant="light" onClick={() => { if (step > 1) setstep(step - 1) }} disabled={(step === 1) ? true : false} style={{ marginRight: '10px' }}>Previous</Button>
                <Button variant="light" onClick={() => { if (step < 4) { setstep(step + 1); personaldataValidator(); } }} disabled={(errors && Object.keys(errors).length === 0) ? true : false} style={(step === 4) ? { display: 'none' } : undefined} >Next</Button>
                {(step === 4) && <Button variant='outline' type='submit'>Submit</Button>}
            </div>
        </div>
      
)
};


export default Personaldatafrom;