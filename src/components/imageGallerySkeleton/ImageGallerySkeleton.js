import './imageGallerySkeleton.scss';

const ImageGallerySkeleton = () => {

    let items = [];

    for (let i = 0; i < 15; i++) {
       items.push(
            <li className=" imageGallerySkeleton__card"
            key={i}>
            <div className=" imageGallerySkeleton__imgBlock"></div>
            <div className=" imageGallerySkeleton__descrBlock">
                <ul className="">
                    <li className=""></li>
                    <li className=""></li>
                    <li className=""></li>
                    <li className=""></li>
                </ul>
            </div>
            </li>
       )
    }   

    return (
        <ul className="pulse imageGallerySkeleton">
            {items}
        </ul>
    )
}

export default ImageGallerySkeleton;