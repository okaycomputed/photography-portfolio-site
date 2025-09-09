import { Link } from "react-router-dom";
import { translations } from "../translations";
import { useLanguageContext } from "../contexts/LanguageContext";
import { TbSwitchVertical } from "react-icons/tb";
import '../css/NavBar.css'
import '../css/Animations.css'

function NavBar() {
    const {lang, setLang} = useLanguageContext();

    const toggleLanguage = () => {
        setLang((prev) => {
            const newLang = prev === "en" ? "kr" : "en";
            localStorage.setItem("lang", newLang);
            return newLang;
        });
    };

    const translate = translations[lang];

    return (<nav className="navbar">
        <Link to="/" className={`nav-title fade-from-top`} key={`title-${lang}`}>{translate.title}</Link>
            <div className="navbar-right fade-from-top" key={lang}>
                <div className="navbar-links">
                    <Link to="/" className="nav-link">{translate.home}</Link>
                    <Link to="/photography" className="nav-link">{translate.photography}</Link>
                    <Link to="/contact" className="nav-link">{translate.contact}</Link>
                </div>
                <div className="language-selector" onClick={toggleLanguage}>
                    <TbSwitchVertical size={20}/>
                    <span key={lang} className="language-text fade-from-top">
                        {lang === "en" ? "ENG" : "한국인"}
                    </span>
                </div>
            </div>
        </nav>)
} 

export default NavBar