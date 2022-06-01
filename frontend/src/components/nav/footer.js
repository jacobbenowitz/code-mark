import React from "react"
import { NavLink, Link } from "react-router-dom";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedIn from '@material-ui/icons/LinkedIn';
// import AngelList from '@material-ui/icons/Angellist';

const NavFooter = () => (
    <div className="grid-bottom-stack">
        <div id="navFooter">
            <div id="footer-top">
                <div className="nav-col-01">
                    <div className='pic-wrapper'>
                        <img src={require('./images/Jacob.jpeg')} className='team-pics' />
                    </div>


                    <div className="footer-link-list">
                        <div className="footer-header">
                            <h5>Jacob Benowitz</h5>
                            <span className="footer-subheader">
                                Techlead
                            </span>
                        </div>
                        <div className="footer-link-item">
                            <GitHubIcon sx={{ fontSize: 24 }} />
                            <a href="https://github.com/jacobbenowitz" target="_blank" rel="noreferrer">
                                Github
                            </a>
                        </div>
                        <div className="footer-link-item">
                            <LinkedIn sx={{ fontSize: 24 }} />
                            <a href="https://www.linkedin.com/in/jacobbenowitz/" target="_blank" rel="noreferrer">
                                LinkedIn
                            </a>
                        </div>
                        <div className="footer-link-item">
                            <img src='https://simpleicons.org/icons/angellist.svg' className='angellist-icon' />
                            <a href="https://angel.co/u/jacob-benowitz" target="_blank" rel="noreferrer">
                                AngelList
                            </a>
                        </div>
                    </div>
                </div>

                <div className="nav-col-02">
                    <div className='pic-wrapper'>
                        <img src={require('./images/Johnny.jpeg')} className='team-pics' />
                    </div>
                    <div className="footer-link-list">
                        <div className="footer-header">
                            <h5>Johnny Mei</h5>
                            <span className="footer-subheader">
                                Backend Lead
                            </span>
                        </div>
                        <div className="footer-link-item">
                            <GitHubIcon sx={{ fontSize: 24 }} />
                            <a href="https://github.com/rmei6" target="_blank" rel="noreferrer">
                                Github
                            </a>
                        </div>
                        <div className="footer-link-item">
                            <LinkedIn sx={{ fontSize: 24 }} />
                            <a href="https://www.linkedin.com/in/runqiangmei/" target="_blank" rel="noreferrer">
                                LinkedIn
                            </a>
                        </div>
                        <div className="footer-link-item">
                            <img src='https://simpleicons.org/icons/angellist.svg' className='angellist-icon' />
                            <a href="https://angel.co/u/run-qiang-mei" target="_blank" rel="noreferrer">
                                AngelList
                            </a>
                        </div>
                    </div>
                </div>

                <div className="nav-col-03">
                    <div className='pic-wrapper'>
                        <img src={require('./images/Chris.jpeg')} className='team-pics' />
                    </div>
                    <div className="footer-link-list">
                        <div className="footer-header">
                            <h5>Christopher Moore</h5>
                            <span className="footer-subheader">
                                Frontend Lead
                            </span>
                        </div>
                        <div className="footer-link-item">
                            <GitHubIcon sx={{ fontSize: 18 }} />
                            <a href="https://github.com/MIFUNEKINSKi" target="_blank" rel="noreferrer">
                                Github
                            </a>
                        </div>
                        <div className="footer-link-item">
                            <LinkedIn sx={{ fontSize: 18 }} />
                            <a href="https://www.linkedin.com/in/chris-moore-27438989/" target="_blank" rel="noreferrer">
                                LinkedIn
                            </a>
                        </div>
                        <div className="footer-link-item">
                            <img src='https://simpleicons.org/icons/angellist.svg' className='angellist-icon' />
                            <a href="https://angel.co/u/chris-moore-50"
                                className="a-link"
                                target="_blank" rel="noreferrer">
                                AngelList
                            </a>
                        </div>


                    </div>
                </div>
            </div>

            <div id="footer-bottom">
                <div className="footer-logo">
                    <Link to={'/'}>
                        <img className="nav-logo" src="https://code-mark.s3.amazonaws.com/codemark-logo-primary.svg" alt="CodeMark logo" />
                    </Link>
                </div>
                <div className="footer-bot-wrapper">
                    <a id='bottom-codemark' href="https://github.com/jacobbenowitz/code-mark" target="_blank" rel="noreferrer">
                        CodeMark Github
                    </a>
                    <a id='bottom-codemark' href="https://github.com/jacobbenowitz/code-mark/wiki" target="_blank" rel="noreferrer">
                        CodeMark Wiki
                    </a>
                </div>
            </div>

        </div>
    </div>
);

export default NavFooter;