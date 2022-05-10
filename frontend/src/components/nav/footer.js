import React from "react"
import { NavLink, Link } from "react-router-dom";

const NavFooter = () => (
    <div id="navFooter">
        <div id="footer-top">
            <div className="nav-col-01">
                <div className="footer-header">
                    <h5>Community</h5>
                </div>
                <div className="footer-link-list">
                    <NavLink to={'/'}>Discover</NavLink>
                    <NavLink to={'/'}>Following</NavLink>
                </div>
            </div>

            <div className="nav-col-02">
                <div className="footer-header">
                    <h5>Developers</h5>
                </div>
                <div className="footer-link-list">
                    <a href="https://github.com/jacobbenowitz" target="_blank" rel="noreferrer">
                        Jacob Benowitz
                    </a>
                    <a href="https://github.com/jacobbenowitz" target="_blank" rel="noreferrer">
                        Christopher Moore
                    </a>
                    <a href="https://github.com/jacobbenowitz" target="_blank" rel="noreferrer">
                        Johnny Mei
                    </a>
                </div>
            </div>

            <div className="nav-col-03">
                <div className="footer-header">
                    <h5>Project Links</h5>
                </div>
                <div className="footer-link-list">
                    <a href="https://github.com/jacobbenowitz/code-mark" target="_blank" rel="noreferrer">
                        CodeMark Github
                    </a>
                </div>
            </div>
        </div>

        <div id="footer-bottom">
            <div className="footer-logo">
                <Link to={'/'}
                >Code<strong>Mark</strong>
                </Link>
            </div>
            {/* <div id="bottom-footer-links">
                <NavLink to={'/'}>Privacy</NavLink>
                <NavLink to={'/'}>Terms</NavLink>
            </div> */}
        </div>

    </div>
);

export default NavFooter;