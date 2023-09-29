'use client'
import React, {useEffect, useState} from 'react';
import {Container,Card} from 'react-bootstrap';
/*import AddJobs from './AddJobs';
import Cards from './Cards';
import useDarkMode from './useDarkMode';
import JobCarousel from './JobCarousel';
import LogInRedirect from './LogInRedirect';
import DarkModeButton from './DarkModeButton';
import AddJobButton.js from './AddJobButton.js';*/
import JumbotronBackground from './JumbotronBackground';
import LogOut from "./LogOut";
import ScrollToTop from "./ScrollToTop";
import {destroyCookie, parseCookies} from "nookies";
import {Button, Modal} from 'react-bootstrap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from "next/link";



export default function User1() {
    /*const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [darkMode, setDarkMode] = useDarkMode();
    const [show, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [jumboData, setJumboData] = useState({});*/
    const cookies = parseCookies();
    console.log(cookies)
    const token = cookies.token; // get the token from cookies
    console.log(token)

   /* useEffect(() => {

        fetchJobs().then()

    }, [token]);
*/

   /* const fetchJobs = async () => {
        try{
            const response = await fetch('/api/jobs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const data = await response.json();
            if (data && data.error) {
                //destroyCookie(null, 'token');
                alert(data.message);
            }
            else {
                setJobs(data.data);
            }
        } catch (error) {
            console.log('Fetch jobs error: ', error);
        }

    };

*/
    /* const handleModalToggle = () => setShowModal(!show);

     const handleJumboClick = (id) => {
         setIsOpen(true);
         const selectedJumbo = jobs.find((job) => job.id === id);
         setJumboData(selectedJumbo);
     };*/

    //const handleDarkMode = () => setDarkMode(!darkMode);

    return (
        <>


            <div>
                <ScrollToTop/>

                  {/*  <div>


                        {loading ? (<h1>Loading...</h1>) : (

                            <JumbotronBackground>
                                 <JobCarousel
                                    jobs={jobs}
                                    darkMode={darkMode}
                                    isOpen={isOpen}
                                    openModal={handleJumboClick}
                                    closeModal={() => setIsOpen(false)}
                                    selectedJob={jumboData}
                                />
                            </JumbotronBackground>
                        )}
                        <div className="d-flex justify-content-between">
                              <AddJobButton.js darkMode={darkMode} handleShow={handleModalToggle}/>
                            <DarkModeButton darkMode={darkMode} handleDarkMode={handleDarkMode}/>
                        </div>

                          <AddJobs show={show} handleClose={handleModalToggle}/>

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
*/}
            </div>

        </>
    );
};
