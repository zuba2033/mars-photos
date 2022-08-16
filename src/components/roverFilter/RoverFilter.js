import './roverFilter.scss';

const RoverFilter = () => {
    return (
        <form className="roverFilter">
            <h2 className="roverFilter__title">Choose the rover</h2>
            <div className="roverFilter__inputs">
                <label htmlFor="curiosity">Curiosity</label>
                <input checked type="radio" name="curiosity" id="curiosity" value="curiosity" />
                <label htmlFor="opportunity">Opportunity</label>
                <input type="radio" name="opportunity" id="opportunity" value="opportunity" />
                <label htmlFor="spirit">Spirit</label>
                <input type="radio" name="spirit" id="spirit" value="spirit" />
            </div>
            <button className="roverFilter__btn" type='submit'>Submit</button>
        </form>
    )
}

export default RoverFilter;