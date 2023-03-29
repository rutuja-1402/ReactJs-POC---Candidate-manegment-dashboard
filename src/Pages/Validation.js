// import { id } from "./Home";

export default function Validation(checkdata, isFemaleChecked, isMaleChecked){
    console.log(checkdata)
    const errors={}
    
    const idpattern = /^\d+$/;
    const namepattern = /^[a-zA-Z'-\. ]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(checkdata.id===""){
        errors.id="ID required"
    }
    if(!idpattern.test(checkdata.id)){
        errors.id="ID shouls be in numeric formate"
    }
    // if(checkdata.id===id){
    //     errors.id="ID should be unique"
    // }

    if(checkdata.name===""){
        errors.name="Name is reqiured"
    }
    if(!namepattern.test(checkdata.name)){
        errors.name="Enter proper name"
    }
    if(checkdata.email===""){
        errors.email="Email is required"
    }
    if (!emailPattern.test(checkdata.email)){
        errors.email="Enter Correct Email"
    }
    if (isMaleChecked && isFemaleChecked){
        errors.gender="Select one option"
    }
    return errors
}