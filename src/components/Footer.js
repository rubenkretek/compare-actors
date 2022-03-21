import React from "react";

import { FaGlobe, FaGithub, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__container">
                <a className="footer__social" href="https://design-talk.co.uk/" target="blank">
                    <div className="footer__icon">
                        <FaGlobe />
                    </div>
                    <div className="footer__link">
                        Created By Ruben K
                    </div>
                </a>
                <a className="footer__social" href="https://github.com/rubenkretek/compare-actors" target="blank">
                    <div className="footer__icon">
                        <FaGithub />
                    </div>
                    <div className="footer__link">
                        See Project on Github
                    </div>
                </a>
                <a className="footer__social" href="https://design-talk.co.uk/" target="blank">
                    <div className="footer__icon">
                        <FaLinkedin />
                    </div>
                    <div className="footer__link">
                        Connect on LinkedIn
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Footer;