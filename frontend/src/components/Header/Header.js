import { useContext } from 'react';
import {Link} from 'react-router-dom';
import {url} from '../../urlServer';
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
                <Link className="navbar-brand text-bold d-flex flex-align-center flex-justify-center" to="/">
                <span className="mr-2"><i className='bx bxl-react bx-spin' style={{color:"#2777d4", fontSize:"25px"}}></i></span> <span>MERN STACK</span></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {state.user && 
                            <>
                                <li className="nav-item d-flex flex-align-center flex-justify-center mr-auto">
                                    
                                    {getPostByUser(state.user).length > 0 &&
                                        <img onError={(e) => e.target.src='https://qph.fs.quoracdn.net/main-qimg-2898d743c3c2bf03a45f7c6d9181efe6'} src={`${url}/users/${getImage(state.user)}`} alt="avatar" className="img-responsive mr-2"/>
                                    }
                                    <Link className="nav-link active-user text-bold" to="#">Hello, {state.user}</Link>
                                </li>
                                <li className="nav-item">
                                <span className="nav-link cr-pt" onClick={Signout}>
                                    <i className="fas fa-sign-out-alt" style={{color: "#2777d4"}}></i> Signout</span>
                                </li>
                            </>
                        }
                        {!state.user && 
                            <>
                                <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    <i className="fas fa-sign-in-alt" style={{color: "#2777d4"}}></i> Login</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    <i className="far fa-registered" style={{color: "#2777d4"}}></i> Register</Link>
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