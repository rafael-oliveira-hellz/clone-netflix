import React from "react";
import './Header.css'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Logo Netflix" />
                </a>
            </div>

            <div className="header--user">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Logo Netflix" />
                </a>
            </div>
        </header>
    )
}