import React from "react";
import { Link } from "react-router-dom";


export const EditorsChoiceLanding = (
    <div className="editors-choice-landing">
        <div className="landing-image-header">
            <div className="landing-header-content">
                <div className="icon-container">
                    {/* icon image */}
                    <img src="https://code-mark.s3.amazonaws.com/process.svg" />
                </div>
                <h2>Smart bookmarks for code</h2>
               
            </div>
        </div>

        <div id="editors-gallery"
            className="landing-gallery-container">
            <div className="landing-gallery-header">
                <h5>Find the best code.</h5>
                <span>Our discover page is the best place to find new and valuable code</span>
                <Link to={'/'} className="landing-large-button">View Discovery Page</Link>
            </div>

            <div className="image-gallery-2-row">
                <div className="editors-gallery-row">

                    <div className="editors-gallery-col">
                        <div className="editors-box">
                            <Link to={'#'} >
                                <img className="editors-gal-img"
                                    src="https://my5000px-static.s3.amazonaws.com/800px/silhouette-of-boy-throwing-a-net-into-the-water.jpg" alt="Photo by Username" />
                            </Link>
                            <div className="editors-img-attribution">
                                <Link to={'#'} className="img-attribution-link">
                                    <span>Photo by Username</span>
                                </Link>
                            </div>
                        </div>

                        <div className="editors-box">
                            <Link to={'#'} >
                                <img className="editors-gal-img"
                                    src="https://my5000px-static.s3.amazonaws.com/800px/silhouette-of-fitness-woman-running-on-the-beach.jpg" />
                            </Link>
                            <div className="editors-img-attribution">
                                <Link to={'#'} className="img-attribution-link">
                                    <span>Photo by Username</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="editors-gallery-col">

                        <div className="editors-box">
                            <Link to={'#'} >
                                <img className="editors-gal-img"
                                    src="https://my5000px-static.s3.amazonaws.com/800px/lost-in-the-city.jpg" alt="Photo by Username" />
                            </Link>
                            <div className="editors-img-attribution">
                                <Link to={'#'} className="img-attribution-link">
                                    <span>Photo by Username</span>
                                </Link>
                            </div>
                        </div>

                        <div className="editors-box">
                            <Link to={'#'} >
                                <img className="editors-gal-img"
                                    src="https://my5000px-static.s3.amazonaws.com/800px/red-fox-cub-vulpes-vulpes.jpg" alt="Photo by Username" />
                            </Link>
                            <div className="editors-img-attribution">
                                <Link to={'#'} className="img-attribution-link">
                                    <span>Photo by Username</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="editors-gallery-col">
                        <div className="editors-box">
                            <Link to={'#'} >
                                <img className="editors-gal-img"
                                    src="https://my5000px-static.s3.amazonaws.com/800px/los-angeles-vibes.jpg" alt="Photo by Username" />
                            </Link>
                            <div className="editors-img-attribution">
                                <Link to={'#'} className="img-attribution-link">
                                    <span>Photo by Username</span>
                                </Link>
                            </div>
                        </div>

                        <div className="editors-box">
                            <Link to={'#'} >
                                <img className="editors-gal-img"
                                    src="https://my5000px-static.s3.amazonaws.com/800px/moody-autumn-day-in-the-dolomites-forest.jpg" alt="Photo by Username" />
                            </Link>
                            <div className="editors-img-attribution">
                                <Link to={'#'} className="img-attribution-link">
                                    <span>Photo by Username</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    </div>
)