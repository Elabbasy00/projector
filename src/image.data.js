import Img1 from './assets/images/1.jpg';
import Img2 from './assets/images/2.jpg';
import Img3 from './assets/images/3.jpg';
import Img4 from './assets/images/4.jpg';
import Img5 from './assets/images/5.jpg';
import Img6 from './assets/images/6.jpg';
import Img7 from './assets/images/7.jpg';

import Vid1 from './assets/videos/1.mp4';
import Vid2 from './assets/videos/2.mp4';
import Vid3 from './assets/videos/3.mp4';
import Vid4 from './assets/videos/4.mp4';
import Vid5 from './assets/videos/5.mp4';

import pdf1 from './assets/pdfs/1.pdf';
import pdf2 from './assets/pdfs/2.pdf';
import pdf3 from './assets/pdfs/3.pdf';
import pdf4 from './assets/pdfs/4.pdf';
import pdf5 from './assets/pdfs/5.pdf';
import pdf6 from './assets/pdfs/6.pdf';

import pdImg1 from './assets/pdfs/1.jpg';
import pdImg2 from './assets/pdfs/2.jpg';
import pdImg3 from './assets/pdfs/3.jpeg';
import pdImg4 from './assets/pdfs/4.jpeg';
import pdImg5 from './assets/pdfs/5.jpg';
import pdImg6 from './assets/pdfs/6.jpg';

const Images = {
  title: 'Image',
  data: [
    { id: 1, src: Img1, alt: 'image1' },
    { id: 2, src: Img2, alt: 'image2' },
    { id: 3, src: Img3, alt: 'image3' },
    { id: 4, src: Img4, alt: 'image4' },
    { id: 5, src: Img5, alt: 'image5' },
    { id: 6, src: Img6, alt: 'image6' },
    { id: 7, src: Img7, alt: 'image7' },
  ],
};

const Videos = {
  title: 'Videos',
  data: [
    { id: 1, src: Vid1, alt: 'image1' },
    { id: 2, src: Vid2, alt: 'image2' },
    { id: 3, src: Vid3, alt: 'image3' },
    { id: 4, src: Vid4, alt: 'image4' },
    { id: 5, src: Vid5, alt: 'image5' },
  ],
};

const Pdf = {
  title: 'Books Pdf',
  data: [
    { id: 1, src: pdImg1, alt: 'image1', pdf: pdf1 },
    { id: 2, src: pdImg2, alt: 'image2', pdf: pdf2 },
    { id: 3, src: pdImg3, alt: 'image3', pdf: pdf3 },
    { id: 4, src: pdImg4, alt: 'image4', pdf: pdf4 },
    { id: 5, src: pdImg5, alt: 'image5', pdf: pdf5 },
    { id: 6, src: pdImg6, alt: 'image5', pdf: pdf6 },
  ],
};

export { Images, Videos, Pdf };
