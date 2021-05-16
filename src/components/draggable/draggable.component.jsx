import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import './draggable.styles.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const { ipcRenderer } = window.require('electron');

const Draggable = ({ data }) => {
  function onClick(e) {
    if (e.target.getAttribute('type') === 'pdf') {
      ipcRenderer.send('sendGallery', {
        src: e.target.currentSrc,
        pdf: e.target.getAttribute('pdf'),
        type: 'pdf',
      });
    } else if (e.target.tagName === 'IMG') {
      ipcRenderer.send('sendGallery', {
        src: e.target.currentSrc,
        type: 'IMG',
      });
    } else if (e.target.tagName === 'VIDEO') {
      ipcRenderer.send('sendGallery', {
        src: e.target.currentSrc,
        type: 'Video',
      });
    }
  }
  const options = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,

    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };
  return (
    <div className="drag-container">
      <h2 className="category-title">{data.title}</h2>
      <OwlCarousel className="owl-theme" {...options}>
        {data.title === 'Image' || data.title === 'Books Pdf'
          ? data.data.map((item) => (
              <div key={item.id} className="item">
                <img
                  alt={item.alt}
                  src={item.src}
                  onClick={onClick}
                  pdf={item.pdf ? `${item.pdf}` : null}
                  type={item.pdf ? 'pdf' : 'IMG'}
                />
              </div>
            ))
          : data.title === 'Videos'
          ? data.data.map((vid) => (
              <div key={vid.id} className="item">
                <video className="review-video" onClick={onClick} controls>
                  <source src={vid.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))
          : null}
      </OwlCarousel>
    </div>
  );
};

export default Draggable;
