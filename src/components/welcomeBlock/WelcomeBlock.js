import './welcomeBlock.scss';

const WelcomeBlock = () => {
    return (
        <header className="welcomeBlock">
                <h1 className="welcomeBlock__title">Dear friend!</h1>
                <div className="welcomeBlock__text">
                    Here you can see the photos from the surface of Mars!
                    <ul className="welcomeBlock__list">
                        <li>1. Choose rover (the Perseverance is recommended!)</li>
                        <li>2. Choose sol (Martian day) or click random</li>
                        <li>3. Open slider when the gallery is loaded!</li>
                    </ul>
                    <div className="welcomeBlock__contacts">
                        For any issues contact me on <a href="https://github.com/zuba2033/mars-photos/issues">GitHub!</a>
                    </div>
                </div>
        </header>
    )
}

export default WelcomeBlock;