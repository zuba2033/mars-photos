import './manifestSkeleton.scss';

const ManifestSkeleton = () => {
    return (
        <div className="pulse manifestSkeleton">
            <div className="pulse img-block"></div>
            <ul className="pulse list-block">
                <div className="pulse list-title-block"></div>
                <li className='pulse' ></li>
                <li className='pulse' ></li>
                <li className='pulse' ></li>
                <li className='pulse' ></li>
                <li className='pulse' ></li>
                <li className='pulse' ></li>
                <li className='pulse' ></li>
            </ul>
        </div>
    )
}

export default ManifestSkeleton;