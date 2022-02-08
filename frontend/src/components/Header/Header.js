import { useContext } from 'react';
import {Link} from 'react-router-dom';
import { AppContext, getCurrentUser } from '../../exportStore';
import './Header.css';

const Header = () => {
    const {state, dispatch} = useContext(AppContext);
    //lấy image của user dựa vào post
    const getImage = (username) => {
        let image = '';
        if(state.posts){
            state.posts.forEach(post => {
                if(post.author.username === username){
                    image = post.author.image;
                }
            });
        }
        return image;
    }
    //lấy bài post theo user
    const getPostByUser = (username) => {
        let posts = [];
        if(state.posts){
            state.posts.forEach(post => {
                if(post.author.username === username){
                    posts.push(post);
                }
            });
        }
        return posts;
    }
    const Signout = () => {
        localStorage.removeItem('token');
        dispatch(getCurrentUser(null));
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand text-bold" to="/">
                    <i className="fab fa-twitter" style={{color: "#22ddd9"}}></i> Twitter</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {state.user && 
                            <>
                                <li className="nav-item d-flex flex-align-center flex-justify-center mr-auto">
                                    {getPostByUser(state.user).length > 0 &&
                                        <img onError={(e) => e.target.src='https://qph.fs.quoracdn.net/main-qimg-2898d743c3c2bf03a45f7c6d9181efe6'} src={`./uploads/users/${getImage(state.user)}`} alt="avatar" className="img-responsive mr-2"/>
                                    }
                                    <Link className="nav-link active-user text-bold" to="#">Hello, {state.user}</Link>
                                </li>
                                <li className="nav-item">
                                <span className="nav-link cr-pt" onClick={Signout}>
                                    <i className="fas fa-sign-out-alt" style={{color: "#22ddd9"}}></i> Signout</span>
                                </li>
                            </>
                        }
                        {!state.user && 
                            <>
                                <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    <i className="fas fa-sign-in-alt" style={{color: "#22ddd9"}}></i> Login</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    <i className="far fa-registered" style={{color: "#22ddd9"}}></i> Register</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Header;