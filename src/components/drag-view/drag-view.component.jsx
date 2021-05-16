import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './drag-view.styles.css';
const { ipcRenderer } = window.require('electron');

function DragView() {
  const container = useRef(null);
  let active = false,
    currentX,
    currentY,
    initialX,
    initialY,
    xOffset = 0,
    yOffset = 0,
    timestamp = 0,
    currentmY,
    mY = 0,
    now,
    dt,
    distance,
    speed;

  function dragStart(e) {
    if (e.type === 'touchstart') {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }

    if (e.target === container.current.children[0]) {
      active = true;
    }
  }
  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
  }
  function drag(e) {
    if (active) {
      if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
        now = Date.now();
        currentmY = e.touches[0].screenY;

        dt = now - timestamp;
        distance = Math.abs(currentmY - mY);
        speed = Math.round((distance / dt) * 1000);

        mY = currentmY;
        timestamp = now;
        if (speed > 2000 && container.current.getBoundingClientRect().top < 0) {
          if (e.target.getAttribute('data') === 'pdf') {
            ipcRenderer.send('nameMsg', {
              src: container.current.children[0].src,
              pdf: e.target.pdf,
              type: 'Img',
            });
          } else if (e.target.type === 'IMG') {
            ipcRenderer.send('nameMsg', {
              src: container.current.children[0].src,
              type: 'Img',
            });
          } else if (e.target.type === 'VIDEO') {
            ipcRenderer.send('nameMsg', {
              src: container.current.children[0].src,
              type: 'Video',
            });
          }
          gsap.to(e.target, {
            translateY: -window.innerHeight,
            ease: 'linear.EaseNone',
          });

          dragEnd();
        }
      } else {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        now = Date.now();
        currentmY = e.screenY;

        dt = now - timestamp;
        distance = Math.abs(currentmY - mY);
        speed = Math.round((distance / dt) * 1000);

        mY = currentmY;
        timestamp = now;
        if (speed > 2000 && container.current.getBoundingClientRect().top < 0) {
          if (e.target.type === 'pdf') {
            ipcRenderer.send('nameMsg', {
              src: container.current.children[0].src,
              pdf: e.target.pdf,
              type: 'pdf',
            });
          } else if (e.target.type === 'IMG') {
            ipcRenderer.send('nameMsg', {
              src: container.current.children[0].src,
              type: 'Img',
            });
          } else if (e.target.type === 'VIDEO') {
            ipcRenderer.send('nameMsg', {
              src: container.current.children[0].src,
              type: 'Video',
            });
          }
          gsap.to(e.target, {
            translateY: -window.innerHeight,
            ease: 'linear.EaseNone',
          });

          dragEnd();
        }
      }

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, container.current);
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
  }
  useEffect(() => {
    ipcRenderer.on('forGallary', function (event, arg) {
      if (arg.type === 'pdf') {
        const img = document.createElement('img');
        img.src = `${arg.src}`;
        img.type = 'pdf';
        img.pdf = `${arg.pdf}`;
        container.current.innerHTML = '';
        container.current.appendChild(img);
        currentY = 0;
        currentX = 0;
        yOffset = 0;
        xOffset = 0;
        setTranslate(currentX, currentY, container.current);
      } else if (arg.type === 'IMG') {
        const img = document.createElement('img');
        img.src = `${arg.src}`;
        img.type = 'IMG';
        container.current.innerHTML = '';
        container.current.appendChild(img);
        currentY = 0;
        currentX = 0;
        yOffset = 0;
        xOffset = 0;
        setTranslate(currentX, currentY, container.current);
      } else if (arg.type === 'Video') {
        var video = document.createElement('video');
        container.current.innerHTML = '';
        video.src = `${arg.src}`;
        video.autoplay = true;
        video.type = 'VIDEO';

        container.current.appendChild(video);
        currentY = 0;
        currentX = 0;
        yOffset = 0;
        xOffset = 0;
        setTranslate(currentX, currentY, container.current);
      }
    });
  }, []);
  return (
    <div
      className="viwer"
      ref={container}
      onMouseMove={drag}
      onMouseUp={dragEnd}
      onMouseDown={dragStart}
      onTouchStart={dragStart}
      onTouchEnd={dragEnd}
      onTouchMove={drag}
    ></div>
  );
}

export default DragView;
