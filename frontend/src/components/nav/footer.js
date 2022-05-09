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
                    <NavLink to={'/'}>Popular Codesnippets</NavLink>
                    <NavLink to={'/'}>Upcoming Codesnippets</NavLink>
                    <NavLink to={'/'}>Fresh Codesnippets</NavLink>
                    <NavLink to={'/'}>Editors Choice</NavLink>
                </div>
            </div>

            <div className="nav-col-02">
                <div className="footer-header">
                    <h5>Social</h5>
                </div>
                <div className="footer-link-list">
                    <NavLink to={'/'}>Github</NavLink>
                    <NavLink to={'/'}>LinkedIn</NavLink>
                    <NavLink to={'/'}>Porfolio</NavLink>
                </div>
            </div>

            <div className="nav-col-03">
                <div className="footer-header">
                    <h5>Company</h5>
                </div>
                <div className="footer-link-list">
                    <Link to={'/'}>CSS Animation Game</Link>
                </div>
            </div>

            <div className="nav-col-04">
                <div className="footer-header">
                    <h5>Download the app</h5>
                </div>
                <div className="footer-link-list">
                    <Link to={'/'}>App Store</Link>
                    <Link to={'/'}>Play Store</Link>
                </div>
            </div>
        </div>

        <div id="footer-bottom">
            <div className="footer-logo">
                <Link to={'/'}
                >Code<strong>Mark</strong>
                </Link>
            </div>
            <div id="bottom-footer-links">
                <NavLink to={'/'}>Privacy</NavLink>
                <NavLink to={'/'}>Terms</NavLink>
            </div>
        </div>

    </div>
);

export default NavFooter;