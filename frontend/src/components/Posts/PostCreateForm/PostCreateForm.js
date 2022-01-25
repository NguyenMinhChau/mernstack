import axios from 'axios';
import { useContext, useState } from 'react';
import { AppContext, createOnePost } from '../../../exportStore';
import {url} from '../../../urlServer';
import './PostCreateForm.css';

const PostCreateForm = () => {
    const {state, dispatch} = useContext(AppContext);
    const [postInput, setPostInput] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const onSubmitHandler = async (e) => {
        try{
            e.preventDefault();
            const token = localStorage.getItem('token');
            const option = {
                method: 'POST',
                url: `${url}/api/v1/posts/create`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: {content: postInput}
            }
            const response = await axios(option);
            dispatch(createOnePost(response.data.data));
            window.location.reload();
        }catch(err){
            setErrorMessage(err.response.data.message);
        }   
    }
    return (
        <>
            {state.user &&
                <div className='pd-rt-15 mt-3'>
                    <form className='from-create-post' onSubmit={onSubmitHandler}>
                        <div className='form-group'>
                            <div className='error-message'>{errorMessage ? `Error: ${errorMessage}` : ''}</div>
                        </div>
                        <div className='form-group'>
                            <textarea className='form-control' id='content' name='content' rows='5' placeholder="What's happening?" value={postInput} onChange={(e)=> {setPostInput(e.target.value)}}/ >
                        </div>
                        <div className='form-group d-flex'>
                            <button className='btn-custom ml-auto' type='submit'>
                                <i className="fab fa-twitter" style={{color: "#22ddd9"}}></i> Tweet
                            </button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}
export default PostCreateForm;