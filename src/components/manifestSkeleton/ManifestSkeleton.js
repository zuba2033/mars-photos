import './manifestSkeleton.scss';

const ManifestSkeleton = () => {
    return (
        <header className=" manifestSkeleton">
            <div className="img-block ">
                <h1 className="welcome-title">Dear friend!</h1>
                <div className="welcome-text">
                    Here you can see the photos from the surface of Mars. Choose rover and sol (Martian day) and start the journey! You can open the slider when the gallery is loaded. If you are here not for academic purposes, 
                    the Perseverance rover is recommended
                </div>

            </div>
            <ul className="list-block">
                <div className="list-title-block pulse"></div>
                <li className="pulse" ></li>
                <li className="pulse" ></li>
                <li className="pulse" ></li>
                <li className="pulse" ></li>
                <li className="pulse" ></li>
                <li className="pulse" ></li>
                <li className="pulse" ></li>
                <li className="pulse" ></li>
                <li className="pulse" ></li>
                <li className="pulse" ></li>
            </ul>
        </header>
    )
}

export default ManifestSkeleton;