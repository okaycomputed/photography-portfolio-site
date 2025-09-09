import  { MdErrorOutline } from "react-icons/md";
import '../css/ErrorMessage.css';


const ErrorMessage = ({message}) => {
    if(!message) {
        return null;
    }

    return (
        <div className="errorMsg">
            <MdErrorOutline size={13}/>
            <p>{message}</p>
        </div>
    )
}

export default ErrorMessage;