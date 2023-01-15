import './swiperSlider.scss';

import { CSSTransition } from 'react-transition-group';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import SwiperCore, { Keyboard } from "swiper/core";

SwiperCore.use([Keyboard]);

const SwiperSlider = (props) => {

    const items = props.items;

    const duration = 500;

    return (
            <div className="swiperSlider__wrapper">  
                <CSSTransition
                    in={props.open} 
                    classNames="swiperSlider"
                    mountOnEnter
                    unmountOnExit
                    timeout={duration}>
                    <div className="swiperSlider">
                        <div className="swiperSlider__close" onClick={props.onSliderClosed}>&#10006;</div>
                        <Swiper pagination={{
                                type: "fraction",
                                }}
                            navigation={true}
                            loop={true}
                            keyboard={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                            initialSlide={props.slideIndex}
                            >
                        {items.map((item, i) => {
                            return  <SwiperSlide  key={i}>
                                        <div className="swiperSlider__wrapper">
                                            <img 
                                                className="swiperSlider__img"
                                                src={items.length !== 0 ? item.path : null} 
                                                alt="marsPhoto">
                                            </img>
                                        </div>
                                    </SwiperSlide>
                        })}
                        </Swiper>
                    </div>                   
                </CSSTransition>
            </div>
            
    )
}

export default SwiperSlider;