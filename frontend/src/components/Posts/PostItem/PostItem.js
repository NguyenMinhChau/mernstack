import axios from 'axios';
import { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import {AppContext, deleteOnePost, updateOnePost} from '../../../exportStore';
import {url} from '../../../urlServer';
import '../Posts.css';

const PostItem = ({post}) => {
    const {state, dispatch} = useContext(AppContext);
    const [openEditor, setOpenEditor] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [postInput, setPostInput] = useState(post);
    const convertDate = (date) => {
        const newDate = new Date(date);
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();
        let year = newDate.getFullYear();
        if(day < 10) {
            day = '0' + day;
        }
        if(month < 10) {
            month = '0' + month;
        }
        return `${day}/${month}/${year}`;
    }
    const openEditorHandler = () => {
        if(openEditor){
            setOpenEditor(false);
        }else{
            setOpenEditor(true);
        }
    }
    const deleteConfirmHandler = () => {
        if(deleteConfirm){
            setDeleteConfirm(false);
        }else{
            setDeleteConfirm(true);
        }
    }
    const onUpdateHandler = async (e) => {
        try{
            setOpenEditor(false);
            const formData = new FormData();
            formData.append('content', postInput.content);
            formData.append('image', postInput.image);
            const token = localStorage.getItem('token');
            const option = {
                method: 'PUT',
                url: `${url}/api/v1/posts/update/${post._id}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                data: formData
            }
            const response = await axios(option);
            dispatch(updateOnePost(response.data.data));
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
    const onDeleteHandler = async (e) => {
        try{
            const token = localStorage.getItem('token');
            const option = {
                method: 'DELETE',
                url: `${url}/api/v1/posts/delete/${post._id}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
            const response = await axios(option);
            dispatch(deleteOnePost(response.data.data._id));
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <li className='post-list-item mb-3'>
                <div className='post-list-item-top'>
                    <p className='post-list-item-text'>{post.content}</p>
                    {post.image &&
                        <>
                            <div className="card w-mobile-80 w-ipadpro-50 w-100 bg-dark">
                                <img onError={(e) => e.target.src='https://qph.fs.quoracdn.net/main-qimg-2898d743c3c2bf03a45f7c6d9181efe6'} src={`/uploads/posts/${post.image}`} className='post-item-image' alt="avatar"/>
                            </div>
                        </>
                        
                    }
                    <div className='post-list-item-info d-flex flex-wrap mt-4'>
                        <div className='post-list-info-left d-flex flex-align-center'>
                            <span className="badge badge-warning mr-3">
                                <Link to="#" className='info-left-author'>by: {post.author.username}</Link>
                            </span>
                            <span className='info-left-date badge badge-light'>CreatedAt: <span className='date'>{convertDate(post.createdAt)}</span></span>
                        </div>
                        <div className='post-list-info-right d-flex ml-auto'>
                            {state.user === post.author.username &&
                                <>
                                    {!deleteConfirm && 
                                        <div className='right-actions mt-3'>
                                            <span onClick={openEditorHandler} className='action-edit mr-2 btn btn-primary'>Edit</span>
                                            <span onClick={deleteConfirmHandler} className='action-delete btn btn-danger'>Delete</span>
                                        </div>
                                    }
                                    {deleteConfirm &&
                                        <div className='right-confirm mt-3'>
                                            <span className="badge badge-warning">
                                                <Link to="#" className='confirm-question text-underline'>Are you sure?</Link>
                                            </span>
                                            <span onClick={onDeleteHandler} className='confirm-yes mx-2 btn btn-danger'>
                                                Yes
                                            </span>
                                            <span onClick={deleteConfirmHandler} className='confirm-no btn btn-primary'>No</span>
                                        </div>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
                {openEditor && !deleteConfirm &&
                    <div className='post-list-item-bottom mt-3'>
                        <form className='form-item-bottom-updates' onSubmit={onUpdateHandler} encType='multipart/form-data'>
                            <div className='form-group'>
                                <textarea className='form-control' id='content' name='content' rows='5' value={postInput.content} onChange={(e) => setPostInput({...postInput, content: e.target.value})}/>
                            </div>
                            <div className='form-group'>
                                <input type='file' className='form-control' id='image' name='image' onChange={(e) => setPostInput({...postInput, image: e.target.files[0]})} required/>
                            </div>
                            <div className='form-group'>
                                <img onError={(e) => e.target.src='https://qph.fs.quoracdn.net/main-qimg-2898d743c3c2bf03a45f7c6d9181efe6'} className='post-item-image image-update' src={`/uploads/posts/${post.image}`} alt=''/>
                            </div>
                            <div className='form-group d-flex'>
                                <button type="submit" className='btn btn-warning ml-auto mr-2'>
                                    <i className="fas fa-edit"></i> Update</button>
                                <span className='btn btn-primary' onClick={openEditorHandler}>
                                    <i className="fas fa-external-link-alt"></i> Cancel</span>
                            </div>
                        </form>
                    </div>
                }
            </li>
        </>
    )
}
export default PostItem;