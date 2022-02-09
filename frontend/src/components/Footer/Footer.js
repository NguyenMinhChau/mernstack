import './Footer.css';
import '../index.js';

const Footer = () => {
    return (
        <>
            <div className='footer'>
                <div className="card text-center bg-dark text-white">
                    <div className="card-header">
                    MERN STACK
                    </div>
                    <div className="card-body">
                    <h5 className="card-title text-bold">Thông tin liên hệ</h5>
                    <p className="card-text">Nguyễn Minh Châu - Frontend Developer (ReactJS)</p>
                    <ul className='list-icons d-flex flex-justify-center flex-align-center'>
                        <li className='icon-item'>
                            <a href="https://www.linkedin.com/in/nguyen-minh-chau-87184320b/">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </li>
                        <li className='icon-item'>
                            <a href="https://github.com/NguyenMinhChau">
                                <i className="fab fa-github"></i>
                            </a>
                        </li>
                        <li className='icon-item'>
                            <a href="tel:0398365404">
                                <i className="fas fa-phone"></i>
                            </a>
                        </li>
                        <li className='icon-item'>
                            <a href="mailto:nmchauhcmue@gmail.com">
                                <i className="fas fa-envelope-open"></i>
                            </a>
                        </li>
                        <li className='icon-item'>
                            <a href="https://goo.gl/maps/Zzcu6kQExDNkDJeH8">
                                <i className="fas fa-map-marker-alt"></i>
                            </a>
                        </li>
                    </ul>
                    </div>
                    <div className="card-footer text-muted">
                        2021 - <span className='year'></span> &copy; Copyright all rights reserved.
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;