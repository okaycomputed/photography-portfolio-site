import { Link } from "react-router-dom";
import { useState } from "react";
import { translations } from "../translations";
import { useLanguageContext } from "../contexts/LanguageContext";
import { RxCross2 } from "react-icons/rx";
import '../css/Animations.css'
import '../css/SlideMenu.css'

function SlideMenu({open, close}) {
    const {lang, setLang} = useLanguageContext();
    const translate = translations[lang];

    return (<>
    <div className={`overlay ${open ? "show" : ""}`} onClick={close}></div>
    <nav className={`slide-menu ${open ? "open" : ""}`}>
        <div className="header-bar">
            <Link to="/" className={`menu-title`} key={`title-${lang}`} onClick={close}>{translate.title}</Link> 
            <div className="exit-btn" onClick={close}>
                <RxCross2 size={30}/>
            </div>
        </div> 

        <div className="menu-links" key={lang}>
            <Link to="/" className="menu-link" onClick={close}>{translate.home}</Link>
            <Link to="/photography" className="menu-link" onClick={close}>{translate.photography}</Link>
            <Link to="/contact" className="menu-link" onClick={close}>{translate.contact}</Link>
        </div>    
    </nav>
    </>)
}

export default SlideMenu