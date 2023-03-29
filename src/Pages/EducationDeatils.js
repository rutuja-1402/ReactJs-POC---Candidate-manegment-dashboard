import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function EducationDeatils(step, setstep,education,setEducation) {
    
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

    return (
        <div style={{ width: 'auto', margin: 'auto', textAlign: 'start', position: 'relative', top: '50px' }}>
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
            <div style={{ position: 'relative', top: '50px' }}>
                <Button variant="light" onClick={() => { if (step > 1) setstep(step - 1) }} disabled={(step === 1) ? true : false} style={{ marginRight: '10px' }}>Previous</Button>
                <Button variant="light" onClick={() => { if (step < 4) { setstep(step + 1)} }} style={(step === 4) ? { display: 'none' } : undefined} >Next</Button>
                {(step === 4) && <Button variant='outline' type='submit'>Submit</Button>}
            </div>
        </div>
    )
}

export default EducationDeatils
