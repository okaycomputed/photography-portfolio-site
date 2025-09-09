import { useLanguageContext } from '../contexts/LanguageContext';
import { translations } from '../translations';
import { Link } from 'react-router-dom';
import '../css/Home.css';
import '../css/Animations.css';

function Home() {
    const {lang} = useLanguageContext();

    const translate = translations[lang];

    return (<>
    <div className="background-container">
        <div className="overlay-text fade-from-top" key={lang}>
            <div className="top-text">
                <p className="top-line"></p>
                <p className="top-heading">{translate.portfolio}</p>
            </div>
            <h1 className="home-title">{translate.header}</h1>
            <Link to="/photography" className="continue">
                {translate.continue}
                <span className="arrow-line"></span>
                <span className="arrow-head"></span>
            </Link>
        </div>
    </div>
    </>)
}

export default Home