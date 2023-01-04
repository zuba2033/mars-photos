import './sliderModal.scss';

import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const SliderModal = (props) => {

    const items = props.items;

    const [slideIndex, setSlideIndex] = useState(props.slideIndex);
    const [imgClassNames, setImgClassNames] = useState('sliderModal__img');

    useEffect(() => {
        setSlideIndex(props.slideIndex);
    }, [props.slideIndex])

    useEffect(() => {
        swipe();
        // eslint-disable-next-line 
    }, []);

    const onSliderClosed = () => {
        setImgClassNames('sliderModal__img');
        props.onSliderClosed();
    }

    const changeSlide = (direction = 1) => {

        let slideNumber = 0;

        if (direction > 0) {
            setImgClassNames('sliderModal__img hide-animation-right');
        } else {
            setImgClassNames('sliderModal__img hide-animation-left');
        }

        if (slideIndex + direction < 0) {
          slideNumber = items.length - 1;
        } else {
          slideNumber = (slideIndex + direction) % items.length;
        }

        setTimeout(() => {
            if (direction > 0) {
                setImgClassNames('sliderModal__img show-animation-right');
            } else {
                setImgClassNames('sliderModal__img show-animation-left');
            }
            setSlideIndex(slideNumber);
        }, 150);
      
      };

    const swipe = () => {
        let x1;
        let x2;
        let y1;
        let y2;
        document.addEventListener('touchstart', (e) => {
            console.log(e);
            x1 = e.touches[0].clientX;
            y1 = e.touches[0].clientY;
        })
        document.addEventListener('touchend', (e) => {
            console.log(e);
            x2 = e.changedTouches[0].clientX;
            y2 = e.changedTouches[0].clientY;
            let deffX = x1 - x2;
            let deffY = y1 - y2;
            console.log(deffX, deffY)

            if (deffX < 0 && Math.abs(deffX) > 100) {
                changeSlide(-1);
            } 
            if (deffX > 0 && Math.abs(deffX) > 100) {
                changeSlide(1);
            }
        })
    }



    const duration = 500;

    return (
        <CSSTransition in={props.open} 
                       classNames="sliderModal"
                       unmountOnExit
                       timeout={duration} >
            <div className="sliderModal" onClick={(e) => {
                if (e.target.classList.contains('sliderModal')) {
                    onSliderClosed();
                }
            }}>
                <div className="sliderModal__wrapper">
                    <img className={imgClassNames} src={items.length !== 0 ? items[slideIndex].path : null} alt="marsPhoto" />
                    <div className="sliderModal__leftArrow" onClick={() => changeSlide(-1)}>
                        <svg className="sliderModal__svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="454.522px" height="454.522px" viewBox="0 0 454.522 454.522">
                        <g>
                            <path className="sliderModal__svg" d="M248.299,399.167c12.354,12.354,12.354,32.391,0,44.744c-12.354,12.365-32.391,12.365-44.75,0L9.259,249.63
                                C3.085,243.453,0,235.355,0,227.258c0-8.095,3.091-16.192,9.259-22.366l194.29-194.284c12.359-12.359,32.396-12.359,44.75,0
                                c12.354,12.354,12.354,32.388,0,44.748L76.391,227.258L248.299,399.167z M273.349,227.258L445.258,55.355
                                c12.354-12.359,12.354-32.394,0-44.748c-12.354-12.359-32.392-12.359-44.751,0L206.218,204.892
                                c-6.174,6.18-9.26,14.271-9.26,22.366c0,8.098,3.092,16.195,9.26,22.372l194.289,194.281c12.359,12.365,32.397,12.365,44.751,0
                                c12.354-12.354,12.354-32.391,0-44.744L273.349,227.258z"/>
                        </g>
                        </svg>
                    </div>
                    <div className="sliderModal__rightArrow" onClick={() => changeSlide(1)} >
                        <svg className="sliderModal__svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="454.52px" height="454.52px" viewBox="0 0 454.52 454.52" >
                        <g>
                            <path d="M378.135,227.256L206.224,55.354c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.388-12.359,44.747,0
                                L445.258,204.89c6.177,6.18,9.262,14.271,9.262,22.366c0,8.098-3.091,16.195-9.262,22.372L250.971,443.91
                                c-12.359,12.365-32.394,12.365-44.747,0c-12.354-12.354-12.354-32.391,0-44.744L378.135,227.256z M9.265,399.166
                                c-12.354,12.354-12.354,32.391,0,44.744c12.354,12.365,32.382,12.365,44.748,0l194.287-194.281
                                c6.177-6.177,9.257-14.274,9.257-22.372c0-8.095-3.086-16.192-9.257-22.366L54.013,10.606c-12.365-12.359-32.394-12.359-44.748,0
                                c-12.354,12.354-12.354,32.388,0,44.748L181.18,227.256L9.265,399.166z"/>
                        </g>
                        </svg>
                    </div>
                    <div className="sliderModal__close" onClick={onSliderClosed}>X</div>
                    <div className="sliderModal__counter">
                        {slideIndex + 1} / {items.length}
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default SliderModal;