import { personalInfo } from '../data/portfolio';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-divider"></div>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <span className="footer-logo">
                            {personalInfo.name.split(' ')[0]}
                            <span className="footer-dot">.</span>
                        </span>
                        <p className="footer-tagline">
                            Building intelligent systems that matter.
                        </p>
                    </div>

                    <div className="footer-links">
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                        <a href={`mailto:${personalInfo.email}`}>
                            Email
                        </a>
                    </div>

                    <p className="footer-copyright">
                        © {currentYear} {personalInfo.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
