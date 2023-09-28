'use client'

import React, {useEffect, useState} from 'react';
import {Container, Card, Button, Modal} from 'react-bootstrap';
import JumbotronBackground from '../main/JumbotronBackground';
import ScrollToTop from "../main/ScrollToTop";
import Link from "next/link";
import {getCookie} from "cookies-next";

export default function User1() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const token= getCookie("token");
    console.log(token)

    useEffect(() => {
        fetch('/api/jobs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
})
            .then((response) => response.json())
            .then((data) => {
                setJobs(data.data);
                setLoading(false);
            }
            );
    }, [token]);




    return (
        <>


            <div>
                <ScrollToTop/>

                  <div>


                        {loading ? (<h1>Loading...</h1>) : (

                            <JumbotronBackground>
                                {/* <JobCarousel
                                    jobs={jobs}
                                    darkMode={darkMode}
                                    isOpen={isOpen}
                                    openModal={handleJumboClick}
                                    closeModal={() => setIsOpen(false)}
                                    selectedJob={jumboData}
                                />*/}
                            </JumbotronBackground>
                        )}
                        <div className="d-flex justify-content-between">
                           {/*   <AddJobButton darkMode={darkMode} handleShow={handleModalToggle}/>
                            <DarkModeButton darkMode={darkMode} handleDarkMode={handleDarkMode}/>*/}
                        </div>

                       {/*   <AddJobs show={show} handleClose={handleModalToggle}/>*/}

                        <div style={{margin: '10px'}}>
                            <Container>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Job Search</Card.Title>
                                        <Card.Text>
                                            {
                                                jobs.map((job) => (
                                                    <h1 key={job.id}>
                                                        <Link href={`/jobcard/${job.id}`}>
                                                            <h1> {job.title}</h1>
                                                        </Link>
                                                        <Link href={`/delete/${job.id}`}>
                                                            <h1>delete</h1>
                                                        </Link>
                                                    </h1>
                                                ))

                                            }
                                        </Card.Text>
                                    </Card.Body>

                                </Card>
                            </Container>

                        </div>

                        <br/>


                    </div>

            </div>

        </>
    );
};
