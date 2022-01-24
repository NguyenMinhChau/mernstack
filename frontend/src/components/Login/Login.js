import {useState, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AppContext, getCurrentUser} from '../../exportStore';
import {url} from '../../urlServer';
import './Login.css';

const Login = () => {
    const {dispatch} = useContext(AppContext);
    const [userInput, setUserInput] = useState({email: '', password: ''});
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useNavigate();
    const onChangeHandler = (event) => {
        setUserInput({...userInput, [event.target.name]: event.target.value});
    }
    const onSubmitHandler = async (event) => {
        try{
            event.preventDefault();
            const option = {
                method: 'POST',
                url: `${url}/api/v1/users/login`,
                data: userInput
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
            <div className='login d-flex flex-justify-center w-100 mt-5 mb-5'>
                <form className='form-login text-center' autoComplete='off' onSubmit={onSubmitHandler}>
                    <h5 className='form-login-text text-bold mt-2 mb-3'>Enter Account</h5>
                    <div className='form-group'>
                        <div className='error-message'>{errorMessage ? `Error: ${errorMessage}` : ''}</div>
                    </div>
                    <div className='form-group'>
                        <input type='email' className='form-control' id='email' name='email' placeholder='Email' value={userInput.email} onChange={onChangeHandler}/>
                    </div>
                    <div className='form-group'>
                        <input type='password' className='form-control mt-4' id='password' name='password' placeholder='Password' value={userInput.password} onChange={onChangeHandler}/>
                    </div>
                    <div className='form-group'>
                        <button className='btn-custom mt-2 w-100'>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Login;