import React from "react";
import { Link } from 'react-router-dom';
import "./Footer.css";

function Footer() {
    return(
        <div className="footer">
            <ul className="footer--ul">
                <li className="footer--li"><img src="/images/icon_nav.svg" className="footer--logo"/></li>
                <li className="footer--li">Données et confidentialité</li>
                <li className="footer--li">Mentions légales</li>
                <li className="footer--li">Contact</li>
            </ul>
        </div>
    )
}

export default Footer;