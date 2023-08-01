import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import s2 from '../images/videoplayback2.mp4';
import s3 from '../images/videoplayback1.mp4';
import s1 from '../images/videoplayback.mp4';

function HomeSlider() {
  const videoData = [{ url: s1 }, { url: s2 }, { url: s3 }];
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        prevIcon={false}
        nextIcon={false}
        interval={5000}
        indicators={false}
      >
        {videoData.map((item) => {
          return (
            <Carousel.Item>
              <div className='videoDiv'>
                <video id='v1' muted autoPlay width={'100%'}>
                  <source src={item.url} type='video/mp4' />
                </video>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
export default HomeSlider;
