import { useLanguageContext } from '../contexts/LanguageContext';
import { translations } from '../translations';
import { useState } from 'react';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { MdCheckCircleOutline, MdOutlineReportGmailerrorred } from 'react-icons/md';
import { ring } from 'ldrs';
import emailjs from "@emailjs/browser";
import ErrorMessage from '../components/ErrorMessage';
import '../css/Contact.css';

function Contact() {
    const {lang} = useLanguageContext();
    
    const translate = translations[lang];

    ring.register();

    const[formData, setFormData] = useState({
        firstName: "",
        lastName:"", 
        email:"", 
        message:""
    });

    const[errors, setErrors] = useState({});

    const namePattern = /^[a-zA-Z']*$/;
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    // By default, form is not submitted
    const[submitted, setSubmitted] = useState(false);

    // Keeps track of if the email has been sent successfully or not
    const[status, setStatus] = useState("");

    const handleChange = (e) => {
        // Sets state with the updated fields
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleValidationOnBlur = (e) => {
        // If the form has not been submitted for the first time, do not validate on blur
        if(!submitted) {
            return;
        }

        // Takes in the 'name' value of the selected text field
        const{name} = e.target;
        
        // Validates the current 'formData'
        // Returns 'errors' object containing CURRENT errors in the field
        const currErrors = validateInput(formData);
        
        // Takes in a parameter of the previous errors
        setErrors((prevErrors) => {
            // Makes new object to update
            const newErrors = { ...prevErrors };

            // If the field is still present in the 'errors' object, it is still invalid
            if (currErrors[name]) {
                // Places the error inside newErrors object
                newErrors[name] = currErrors[name];
            }
            
            // If not, remove the field from the 'errors' object
            else {
                delete newErrors[name];
            }
            
            return newErrors;
        });
    }

    // Variable 'inputValue' is assigned to 'formData' object.
    // Checks for errors to display
    const validateInput = (inputValue = formData) => {
        // New object to keep track of errors
        let newErrors = {};

        if(!inputValue.firstName.trim()) {
            newErrors.firstName = "Req";
        }

        else if(!namePattern.test(inputValue.firstName)) {
            newErrors.firstName = "Inv";
        }

        if(!inputValue.lastName.trim()) {
            newErrors.lastName = "Req";
        }

        else if(!namePattern.test(inputValue.lastName)) {
            newErrors.lastName = "Inv";
        }

        if(!inputValue.message.trim()) {
            newErrors.message = "Req";
        }

        if(!inputValue.email.trim()) {
            newErrors.email = "Req";
        }

        else if(!emailPattern.test(inputValue.email)) {
            newErrors.email = "Inv";
        }
        
        return newErrors;
    }

    const sanitizeInput = (inputValue) => {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
  
        return inputValue.replace(/[&<>"']/g, (m) => map[m]).trim();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // After first submit, change state to 'true'
        setSubmitted(true);

        // Check for errors before submitting
        const newErrors = validateInput(formData);

        // Sets new errors into 'errors' obj
        setErrors(newErrors);

        // Checks if the 'errors' object is empty
        if(Object.keys(newErrors).length === 0) {
            // Set default icon state to 'loading'
            setStatus("loading");
            
            // Import environment varibles
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const userId = import.meta.env.VITE_EMAILJS_USER_ID;

            try {
                // Compile data from file and send it via emailJS
                await emailjs.send(serviceId, templateId, {
                    name: `${sanitizeInput(formData.firstName)} ${sanitizeInput(formData.lastName)}`,
                    email: sanitizeInput(formData.email),
                    message: sanitizeInput(formData.message),
                }, userId);

                setStatus("success");
            } 
            catch (err) {
                setStatus("error");
            }
        }
    }

    const renderIcon = (status) => {
        let icon = null;

        switch(status) {
            case 'success':
                icon = <MdCheckCircleOutline color = "white" size= {16}/>;
                break;
            
            case 'error':
                icon = <MdOutlineReportGmailerrorred color = "white" size= {16}/>;
                break;

            case 'loading':
                icon = <l-ring size="16" color="white" stroke="2"></l-ring>;
                break;

            default:
                icon = null;
                break;        
        }

        return icon;
    }

    return <>
    <div className="contact-container">
        <div className="contact-image">
            <img src="/gallery/contactImg.webp"></img>
        </div>

        <div className="contact-section fade-from-top" key={lang}>

            <div className="contact-header">
                <h2>{translate.contactHeader}</h2>
                <div className="social-links">
                    <a href="https://instagram.com/_cshwp" target="_blank" rel="noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://youtube.com//@chiyngj" target="_blank" rel="noreferrer">
                        <FaYoutube />
                    </a>
                    <a href="https://tiktok.com/@_cshwp" target="_blank" rel="noreferrer">
                        <FaTiktok />
                    </a>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
                <div className="row">
                    <div className="input-group half-width">
                        <label>{translate.firstName}</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            onBlur={handleValidationOnBlur}
                            aria-invalid={!!errors.firstName}
                        />
                        <ErrorMessage message={errors.firstName ? translate.firstNameErr[errors.firstName] : null}/>

                    </div>
                    <div className="input-group half-width">
                        <label>{translate.lastName}</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            onBlur={handleValidationOnBlur}
                            aria-invalid={!!errors.lastName}
                        />
                        <ErrorMessage message={errors.lastName ? translate.lastNameErr[errors.lastName] : null}/>
                    </div>
                </div>

                <div className="input-group full-width">
                    <label>{translate.email}</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleValidationOnBlur}
                        aria-invalid={!!errors.email}
                    />
                    <ErrorMessage message={errors.email ? translate.emailErr[errors.email] : null}/>
                </div>

                <div className="input-group full-width">
                    <label>{translate.message}</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) => {
                            handleChange(e);
                            // Adjusts the size of the text area according to the scroll height
                            const style = window.getComputedStyle(e.target);

                            // Removes padding for a consistent text area size
                            const padding = parseInt(style.paddingTop) + parseInt(style.paddingBottom);
                            
                            e.target.style.height = "auto";
                            e.target.style.height = (e.target.scrollHeight - padding) + "px";
                        }}
                        rows="1" 
                        maxLength={500}
                        placeholder={translate.placeholder}
                        onBlur={handleValidationOnBlur}
                        aria-invalid={!!errors.message}
                    />
                    <ErrorMessage message={errors.message ? translate.messageErr : null}/>
                </div>

                <button type="submit" className="send-msg-btn">{translate.sendMsg}</button>
                <div className="sent-state">
                    {renderIcon(status)}
                    <span className="sent-text">{status ? translate.status[status] : null}</span>
                </div>
            </form>
        </div>
    </div>
    </>
}

export default Contact