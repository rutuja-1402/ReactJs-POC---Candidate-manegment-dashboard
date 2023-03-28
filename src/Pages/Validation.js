export default function Validation(checkdata){
    console.log(checkdata)
    const errors={}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(checkdata.email===""){
        errors.email="Email is required"
    }
    if (!emailPattern.test(checkdata.email)){
        errors.email="Enter Correct Email"
    }

    return errors
}