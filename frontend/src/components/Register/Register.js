import {useState, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Register.css';
import { AppContext, getCurrentUser } from '../../exportStore';
import {url} from '../../urlServer';

const Register = () => {
    const {dispatch} = useContext(AppContext);
    const [userInput, setUserInput] = useState({username: '', email: '', password: '', image: ''});
    const [imageuser, setImageuser] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useNavigate();
    const onChangeHandler = (event) => {
        setUserInput({...userInput, [event.target.name]: event.target.value});
    }
    const handleImageChange = (event) => {
        setImageuser(event.target.files[0]);
    }
    const onSubmitHandler = async (event) => {
        try{
            event.preventDefault();
            const formData = new FormData();
            formData.append('image', imageuser);
            formData.append('username', userInput.username);
            formData.append('email', userInput.email);
            formData.append('password', userInput.password);
            const option = {
                method: 'POST',
                url: `${url}/api/v1/users/register`,
                data: formData,
            }
            const response = await axios(option);
            const token = response.data.data.token;
            localStorage.setItem('token', token);
            dispatch(getCurrentUser(response.data.data.user.username));
            history('/');
        }catch(err){    
            setErrorMessage(err.response.data.message);
        }
    }
    return (
        <>
            <div className='register d-flex flex-justify-center flex-align-center w-100 mt-5 mb-5 mh-60vh'>
                <form className='form-register text-center w-mobile-80 w-ipadpro-50' autoComplete='off' onSubmit={onSubmitHandler} encType='multipart/form-data'>
                    <h5 className='form-register-text text-bold mt-2 mb-4'>Register Account</h5>
                    <div className='form-group'>
                        {errorMessage && 
                            Array.isArray(errorMessage) ?
                            errorMessage.map((err, index) => {
                                return <div key={index} className='error-message'>Error: {err}</div>
                            }) : 
                            <div className='error-message'>{errorMessage ? `Error: ${errorMessage}` : ''}</div>
                        }
                        <div className='error-message'></div>
                    </div>
                    <div className='form-group'>
                        <input type='text' className='form-control' id='username' name='username' placeholder='Name' value={userInput.username} onChange={onChangeHandler}/>
                    </div>
                    <div className='form-group'>
                        <input type='email' className='form-control mt-4' id='email' name='email' placeholder='Email' value={userInput.email} onChange={onChangeHandler}/>
                    </div>
                    <div className='form-group'>
                        <input type='password' className='form-control mt-4' id='password' name='password' placeholder='Password' value={userInput.password} onChange={onChangeHandler}/>
                    </div>
                    <div className='form-group'>
                        <input type='file' className='form-control mt-4' id='image' name='image' onChange={handleImageChange}/>
                    </div>
                    <div className='form-group'>
                        <button className='btn-custom mt-2 w-100'>Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Register;