import axios from 'axios';
import { useCallback, useContext, useEffect } from 'react';
import {PostItem, AppContext, getAllPost} from '../../../exportStore';
import '../Posts.css';
import {url} from '../../../urlServer';
const PostContainer = () => {
    const {state, dispatch} = useContext(AppContext);
    const getAllPosts = useCallback(async () => {
        try{
            const option = {
                method: 'GET',
                url: `${url}/api/v1/posts`,
            }
            const response = await axios(option);
            dispatch(getAllPost(response.data.data));
        }catch(err){
            console.log(err);
        }
    },[dispatch]);
    useEffect(() => {
        getAllPosts();
    },[getAllPosts]);
    return (
        <>
            {state.posts.length > 0 ? 
            <div className='pd-rt-15 mt-3 mh-60vh'>
                <ul className='post-list-container'>
                    {state.posts.map((post, index) => {
                        return (
                            <PostItem post={post} key={index}/>
                        )
                    })}
                </ul>
            </div> : 
            <div className="no-post mt-4 mb-4">Đang tải dữ liệu. Vui lòng đợi!! <span class="loader ml-3"></span></div>
            }
        </>
    )
}
export default PostContainer;