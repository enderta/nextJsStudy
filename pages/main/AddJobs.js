import React, {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {parseCookies} from "nookies";

const cookies = parseCookies();
const token = cookies.token; // get the token from cookies
const user_id = cookies.user_id;
async function addJob(job) {
    return await fetch(`http://localhost:3000/api/jobs/create/${user_id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: token},
        body: JSON.stringify(job),
    });
}

const currentDate = new Date().toISOString().split(' ').slice(0, 4).join(' ');

function AddJobs(props) {

    const initialJobState = {
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: '',
        is_applied: false,
        posted_at: currentDate,
        updated_at: currentDate,
    };

// Initialize state
    const [job, setJob] = useState(initialJobState);
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            await addJob(job);
            /* alert('Job added successfully');
             //wait for click to close modal and refresh page
             props.handleClose();*/
            window.location.reload();
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleChanges = (e) => setJob({...job, [e.target.name]: e.target.value});

    return (
        <div className="container">

                    <Form style={{color: "black"}}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" name="title"
                                          data-testid="Enter Title"
                                          value={job.title}
                                          onChange={handleChanges}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Company</Form.Label>
                            <Form.Control type="text" placeholder="Enter Company" name="company"
                                          data-testid="Enter Company"
                                          value={job.company}
                                          onChange={handleChanges}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Enter Location" name="location"
                                          value={job.location}
                                          data-testid="Enter Location"
                                          onChange={handleChanges}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description" name="description"
                                          value={job.description}
                                          data-testid="Enter Description"
                                          onChange={handleChanges}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Requirements</Form.Label>
                            <Form.Control type="text" placeholder="Enter Requirements" name="requirements"
                                          value={job.requirements}
                                          data-testid="Enter Requirements"
                                          onChange={handleChanges}/>
                        </Form.Group>
                    </Form>
                    <Button variant="primary" type="submit" onClick={onSubmitForm}>
Submit
                        </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                        </Button>

        </div>
    );
}

export default AddJobs;