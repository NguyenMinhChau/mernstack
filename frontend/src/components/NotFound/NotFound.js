import './NotFound.css';

const NotFound = () => {
    return (
        <>
            <div className="mh-60vh mt-3 d-flex flex-justify-center flex-align-center w-100 mb-4">
                <div className="card text-center w-mobile-80 w-ipadpro-50 w-50 bg-dark text-white">
                    <div className="card-header text-bold">
                        Twitter App
                    </div>
                    <div className="page-not-found-image"></div>
                    <div className="card-footer text-muted">
                        <a href="/" className="btn btn-outline-primary">Go to homepage</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NotFound;