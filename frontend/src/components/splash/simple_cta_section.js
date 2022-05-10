import React from "react"
import { Link } from "react-router-dom";

export const SimpleCTA = (
    <div className="simple-cta-section">
        <div className="simple-section-copy">
            <h2>Ready to explore the site?</h2>
            <p>If you're short on time click the 'Demo Sign up' button below. Otherwise, click the 'Sign up' button to build your own profile!</p>
        </div>
        <div className="simple-section-buttons">
            <div className="buttons-center">
                <Link to={'/signup'} className="sign-up-large">Sign up</Link>
                <Link to={'/signup'} className="sign-up-large">Demo Sign up</Link>
                
            </div>
        </div>
    </div>
)