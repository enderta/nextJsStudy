'use client';
import { useEffect, useState } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import JumbotronBackground from "./JumbotronBackground";
import JobCarousel from "./JobCarousel";
import ScrollToTop from "./ScrollToTop";
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";

function LogOut() {
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const cookies = parseCookies();

    const handleLogout = () => {
        destroyCookie(null, 'token');
        destroyCookie(null, 'userid');
        setToken('');
        setMessage('You have successfully logged out');
        window.location.href = '/login';
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

function LogInRedirect() {
    return (
        <div>
            <h1>You are not logged in</h1>
          <Link href={'/login'}>
                <button>Log In</button>
            </Link>
        </div>
    );
}


const Jumbo = () => {
    const cookies = parseCookies();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useDarkMode();
    const [show, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [jumboData, setJumboData] = useState({});
    const [token, setToken] = useState(cookies.token || '');
    const [message, setMessage] = useState('');
    const [user_id, setUser_id] = useState("");

    useEffect(() => {
        fetchJobs().then(() => {
            setLoading(false);
        });
    }
    , [token]);

    const fetchJobs = async () => {
        try {
            const response = await fetch('/api/jobs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const data = await response.json();
            if (data && data.error) {
                destroyCookie(null, 'token');

                setToken('');
                setMessage(data.message);
            } else {
                setJobs(data.data);
                setUser_id(data.data.users.id)
            }
        } catch (error) {
            console.log('Fetch jobs error: ', error);
        }
    }

    const handleModalToggle = () => setShowModal(!show);
    const handleJumboClick = (id) => {
        setIsOpen(true);
        const selectedJumbo = jobs.find((job) => job.id === id);
        setJumboData(selectedJumbo);
    };

    const handleDarkMode = () => setDarkMode(!darkMode);

    return (
        <>


            <div>
                <ScrollToTop/>
                {token.length>0 ? (
                    <div>


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
                          {/*  <AddJobButton darkMode={darkMode} handleShow={handleModalToggle}/>
                            <DarkModeButton darkMode={darkMode} handleDarkMode={handleDarkMode}/>*/}
                        </div>

                      {/*  <AddJobs show={show} handleClose={handleModalToggle}/>*/}

                        <div style={{margin: '10px'}}>
                            <Container>
                               {/* <Cards data={jobs} setData={setJobs} dark={darkMode}/>*/}
                                <div style={{bottom: "10px", left: "10px"}}>
                                    <LogOut/>
                                </div>
                            </Container>

                        </div>

                        <br/>


                    </div>
                ) : (
                    <LogInRedirect/>
                )}
            </div>

        </>
    );
};

