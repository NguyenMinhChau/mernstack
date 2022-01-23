import {PostCreateForm, PostContainer} from '../../exportStore';
const Main = () => {
    return (
        <>
            <div className='mh-60vh'>
                <PostCreateForm/>
                <PostContainer/>
            </div>
        </>
    )
}
export default Main;