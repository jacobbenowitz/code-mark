import React from "react";
import { Link } from "react-router-dom";
import DummyHeroNote from "../code_editor/dummy_hero_note";

const heroH1 = (
    <h1 className="hero-h1">Smart bookmarks for code</h1>
);

const heroTagline = (
    <p className="hero-tagline">Expand your coding knowledge by cementing it in
        a note, and explore the resources for it that's automatically generated for you!</p>
);

const heroCredit = (
    <span className="photo-credit">Photo by <strong>Photographer Name</strong></span>
);

export const Hero = (
    <div id='hero-container' >
        <div id="sample-code-editor">
            {/* <DummyHeroNote /> */}
        </div>

        <div id='hero-content'>

            <div id='hero-text'>
                {heroH1}
                {heroTagline}
                <Link to={'/signup'} className="sign-up-large">Sign up</Link>
            </div>
        </div>

        <div className="hero-graphic">
            {/* <img src="https://code-mark.s3.amazonaws.com/dark-hero-graphic.svg" /> */}
        </div>

    </div>
)