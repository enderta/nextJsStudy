import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {parseCookies} from "nookies";

async function addJob(job, user_id, token) {
    return await fetch(`http://localhost:3000/api/jobs/create/${user_id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: token},
        body: JSON.stringify(job),
    });
}

const getCurrentDate = () => new Date().toISOString().split(' ').slice(0, 4).join(' ');

function AddJobs(props) {
    const {user_id, token} = parseCookies(); // get the token and user_id from cookies

    const [job, setJob] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: '',
        is_applied: false,
        posted_at: getCurrentDate(),
        updated_at: getCurrentDate(),
    });

    const handleChanges = (e) => setJob({...job, [e.target.name]: e.target.value});

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            await addJob(job, user_id, token);
            window.location.href = '/users';
        } catch (err) {
            console.error(err.message);
        }
    };

    const formGroups = [
        {id: "formBasicEmail", name: "title", label: "Title", placeholder: "Enter Title"},
        {id: "formBasicPassword", name: "company", label: "Company", placeholder: "Enter Company"},
        {id: "formBasicPassword2", name: "location", label: "Location", placeholder: "Enter Location"},
        {id: "formBasicPassword3", name: "description", label: "Description", placeholder: "Enter Description"},
        {id: "formBasicPassword4", name: "requirements", label: "Requirements", placeholder: "Enter Requirements"}
    ];

    return (
        <div className="container">
            <Form style={{color: "black"}}>
                {formGroups.map((group) => (
                    <Form.Group controlId={group.id} key={group.name}>
                        <Form.Label>{group.label}</Form.Label>
                        <Form.Control type="text" placeholder={group.placeholder} name={group.name}
                                      value={job[group.name]}
                                      onChange={handleChanges}/>
                    </Form.Group>
                ))}
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