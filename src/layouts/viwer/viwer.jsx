import React, { useRef, useState } from 'react';

import gsap from 'gsap';

import './viwer.css';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const { ipcRenderer } = window.require('electron');
function Viwer() {
  const view = useRef(null);
  const pdfView = useRef(null);
  const pdfDisplay = useRef(null);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState(null);

  React.useEffect(() => {
    ipcRenderer.on('forWin2', async function (event, arg) {
      if (arg.type === 'pdf') {
        view.current.innerHTML = '';
        setPageNumber(1);
        setPdf(arg.pdf);
        gsap.fromTo(
          pdfView.current,
          {
            scale: 0,
            translateY: 700,
            ease: 'linear.EaseNone',
          },
          { scale: 1, translateY: 0, ease: 'linear.EaseNone' }
        );
      } else if (arg.type === 'Img') {
        const img = document.createElement('img');
        img.src = `${arg.src}`;
        view.current.innerHTML = '';
        setPdf(null);
        view.current.appendChild(img);
        gsap.fromTo(
          img,
          {
            scale: 0,
            translateY: 700,
            ease: 'linear.EaseNone',
          },
          { scale: 1.2, translateY: 0, ease: 'linear.EaseNone' }
        );
      } else if (arg.type === 'Video') {
        var video = document.createElement('video');
        view.current.innerHTML = '';
        setPdf(null);

        video.src = `${arg.src}`;
        video.autoplay = true;
        view.current.appendChild(video);
        gsap.fromTo(
          video,
          {
            scale: 0,
            translateY: 700,
            ease: 'linear.EaseNone',
          },
          { scale: 1.2, translateY: 0, ease: 'linear.EaseNone' }
        );
      } else if (arg.type === 'PDF') {
      }
    });

    ipcRenderer.on('ChangePageWin2', function (event, arg) {
      if (arg.type === 'next') {
        setPageNumber((prev) => prev + 1);
      } else if (arg.type === 'prev') {
        setPageNumber((prev) => prev - 1);
      }
    });
  }, []);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div className="projector-viwe">
      <div ref={view} className="projector-display"></div>
      <div ref={pdfDisplay} className="pdf-display">
        {pdf ? (
          <div ref={pdfView}>
            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
        ) : null}
      </div>
      <div className="night">
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
        <div className="shooting_star"></div>
      </div>
    </div>
  );
}

export default Viwer;
