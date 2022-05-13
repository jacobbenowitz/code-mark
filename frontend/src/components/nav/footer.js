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
                    <h5>Project Links</h5>
                </div>
                <div className="footer-link-list">
                    <a href="https://github.com/jacobbenowitz/code-mark" target="_blank" rel="noreferrer">
                        CodeMark Github
                    </a>
                </div>
            </div>

            <div className="nav-col-03">
                <div className="footer-header">
                    <h5>Developers</h5>
                </div>
                <div className="footer-link-list">
                    <a href="https://github.com/jacobbenowitz" target="_blank" rel="noreferrer">
                        Jacob Benowitz
                    </a>
                    <a href="https://github.com/MIFUNEKINSKi" target="_blank" rel="noreferrer">
                        Christopher Moore
                    </a>
                    <a href="https://github.com/rmei6" target="_blank" rel="noreferrer">
                        Johnny Mei
                    </a>
                </div>
            </div>
        </div>

        <div id="footer-bottom">
            <div className="footer-logo">
                <Link to={'/'}
                ><svg width="130" height="auto" viewBox="0 0 215 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M111.187 32.5897H116.379V17.1897C116.379 15.2977 116.247 12.4377 116.071 10.1937L116.555 10.1057C116.951 12.4817 117.523 14.8137 118.007 16.8377L120.427 26.0337H124.299L126.719 16.8377C127.203 14.8137 127.775 12.4817 128.171 10.1057L128.655 10.1937C128.479 12.4377 128.347 15.2977 128.347 17.1897V32.5897H133.539V1.7897H126.367L123.727 12.8777C123.243 15.1217 122.891 16.7497 122.671 18.6417H122.187C121.923 16.7497 121.615 15.1217 121.131 12.8777L118.491 1.7897H111.187V32.5897Z" fill="#34D9E3" />
                        <path d="M153.718 30.0377C153.762 30.7857 153.85 31.7537 154.07 32.5897H159.614C159.35 30.8297 159.218 28.7177 159.218 25.8577V17.1897C159.218 11.4697 155.698 9.1817 149.934 9.1817C146.722 9.1817 143.466 9.8857 141.354 10.8097V14.9897H142.806C144.654 14.1097 146.854 13.5817 148.966 13.5817C152.046 13.5817 153.498 14.6817 153.498 17.5417V18.4217L147.778 19.4777C142.278 20.4457 139.33 22.3377 139.33 26.4737C139.33 30.4337 142.014 33.0297 146.678 33.0297C150.374 33.0297 152.266 31.4017 153.366 29.9057L153.718 30.0377ZM153.498 26.4297C152.486 27.7497 150.814 28.7617 148.57 28.7617C146.15 28.7617 145.05 27.6177 145.05 25.9897C145.05 24.3177 146.238 23.2177 149.23 22.6897L153.498 21.8977V26.4297Z" fill="#34D9E3" />
                        <path d="M168.045 32.5897H173.985V17.2337C175.525 15.0337 178.209 13.9777 180.937 13.9777C181.289 13.9777 181.729 13.9777 182.125 14.0657V20.3137H187.097V9.62171C186.129 9.35771 184.545 9.1817 183.049 9.1817C179.045 9.1817 176.141 10.5897 174.337 12.9657L173.985 12.8337V9.62171H168.045V32.5897Z" fill="#34D9E3" />
                        <path d="M18.9219 29.2457C17.2499 30.0377 15.5779 30.4777 13.5099 30.4777C7.65789 30.4777 4.04989 26.8697 4.04989 17.6297C4.04989 8.3897 7.65789 4.7817 13.5099 4.7817C15.5779 4.7817 17.2499 5.2217 18.9219 6.0137H19.5819V2.9777C17.8659 2.1857 15.6219 1.7897 13.5539 1.7897C5.19389 1.7897 0.529892 7.0257 0.529892 17.6297C0.529892 28.2337 5.19389 33.4697 13.5539 33.4697C15.6219 33.4697 17.8659 33.0737 19.5819 32.2817V29.2457H18.9219Z" fill="white" />
                        <path d="M37.2967 33.4697C43.8527 33.4697 47.8567 29.0697 47.8567 21.5897C47.8567 14.1097 43.8527 9.7097 37.2967 9.7097C30.7407 9.7097 26.7367 14.1097 26.7367 21.5897C26.7367 29.0697 30.7407 33.4697 37.2967 33.4697ZM37.2967 30.7417C32.7207 30.7417 30.0807 27.5737 30.0807 21.5897C30.0807 15.6057 32.7207 12.4377 37.2967 12.4377C41.8727 12.4377 44.5127 15.6057 44.5127 21.5897C44.5127 27.5737 41.8727 30.7417 37.2967 30.7417Z" fill="white" />
                        <path d="M70.3235 33.0297H73.5355V0.689697H70.3235V12.4377L70.1475 12.5697C68.3875 10.6777 66.0115 9.7097 63.4155 9.7097C59.0595 9.7097 54.0875 12.5697 54.0875 21.5897C54.0875 30.6097 59.0595 33.4697 63.4155 33.4697C66.0115 33.4697 68.3875 32.5017 70.1475 30.6097L70.3235 30.7417V33.0297ZM70.3235 27.5737C68.4755 29.5977 66.6275 30.6537 64.1195 30.6537C60.7315 30.6537 57.4315 28.6297 57.4315 21.5897C57.4315 14.5497 60.7315 12.5257 64.1195 12.5257C66.6275 12.5257 68.4755 13.5817 70.3235 15.6057V27.5737Z" fill="white" />
                        <path d="M99.8303 29.2897C98.0703 30.2137 96.0903 30.6537 93.8023 30.6537C88.6983 30.6537 85.5743 28.5417 85.1343 22.4257H101.326L101.766 21.9857V21.1937C101.766 14.4617 98.3343 9.7097 91.9543 9.7097C86.4103 9.7097 81.8783 13.7137 81.8783 21.5897C81.8783 29.5537 86.4543 33.4697 93.7143 33.4697C96.3983 33.4697 98.6863 32.9417 100.49 32.1057V29.2897H99.8303ZM85.1343 19.7857C85.5303 14.7257 88.4343 12.4377 91.9543 12.4377C95.5623 12.4377 98.1583 14.6817 98.5103 19.7857H85.1343Z" fill="white" />
                        <path d="M192.449 33.0297L198.389 33.0297L200.569 33.0297L208.245 33.0297L214.317 33.0297L214.317 31.6657L204.109 17.1457L213.833 3.59368L213.833 2.22968L207.893 2.22968L198.389 2.22968L192.449 2.22968L192.449 33.0297Z" fill="#34D9E3" />
                    </svg>

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