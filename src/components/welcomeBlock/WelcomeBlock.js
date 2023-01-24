import './welcomeBlock.scss';

const WelcomeBlock = () => {
    return (
        <header className="welcomeBlock">
                <h1 className="welcomeBlock__title">Dear friend!</h1>
                <div className="welcomeBlock__text">
                    Here you can see the photos from the surface of Mars!
                    <ul className="welcomeBlock__list">
                        <li>Choose rover. The <span>Perseverance</span> is recommended!</li>
                        <li>Choose sol (Martian day). Or click random</li>
                        <li>Load the gallery</li>
                        <li>Open the slider when the gallery is loaded!</li>
                    </ul>
                    <div className="welcomeBlock__contacts">
                        For any issues contact me on <a href="https://github.com/zuba2033/mars-photos/issues">GitHub!</a>
                    </div>
                </div>
        </header>
    )
}

export default WelcomeBlock;