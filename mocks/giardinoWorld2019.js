import footer from '../app/assets/giardino2019Img/00_Footer.png';
import tavoliSedie from '../app/assets/giardino2019Img/01_TavoliSedie.png';
import carport from '../app/assets/giardino2019Img/02_Carport.jpg';
import panchine from '../app/assets/giardino2019Img/03_Panchine.jpg';
import sedie from '../app/assets/giardino2019Img/04_SediePoltrone.jpg';
import tavoli from '../app/assets/giardino2019Img/05_Tavoli.jpg';
import dondoli from '../app/assets/giardino2019Img/06_DondoliAmache.jpg';
import pergole from '../app/assets/giardino2019Img/07_Pergole.jpg';
import divisori from '../app/assets/giardino2019Img/08_DivisoriGiardino.png';
import ombrelloni from '../app/assets/giardino2019Img/09_OmbrelloniBasi.jpg';
import gazebo from '../app/assets/giardino2019Img/10_Gazebo.jpg';
import sdraio from '../app/assets/giardino2019Img/11_SdraioLettini.jpg';
import poltroneDivanetti from '../app/assets/giardino2019Img/12_PoltroneDivanetti.jpg';

import texture from '../app/assets/giardino2019Img/texture.png';
import video from '../app/assets/videos/DS_Splash_Giardino2018-02.mp4';

const world = {
  worldName: 'Giardino e Terrazzo',
  worldTemplateName: 'Giardino2019',
  screenSaverVideo: video,
  title: 'Scopri le soluzioni per Giardino e Terrazzo',
  trailingImage: footer,
  banner: {
    text: 'Scopri le funzioni del Digital Store',
    image: texture
  },
  families: [
    {
      familyName: 'Tavoli',
      image: tavoli,
      categoryCode: 'CAT656'
    },
    {
      familyName: 'Gazebo',
      image: gazebo,
      categoryCode: 'CAT944'
    },
    {
      familyName: 'Sedie da giardino',
      image: sedie,
      categoryCode: 'CAT657'
    },
    {
      familyName: 'Panchine',
      image: panchine,
      categoryCode: 'CAT945'
    },
    {
      familyName: 'Poltrone e Divanetti',
      image: poltroneDivanetti,
      categoryCode: 'CAT4425'
    },
    {
      familyName: 'Ombrelloni e Basi',
      image: ombrelloni,
      categoryCode: 'CAT660'
    },
    {
      familyName: 'Set di tavoli e sedie',
      image: tavoliSedie,
      categoryCode: 'CAT655'
    },
    {
      familyName: 'Dondoli e Amache',
      image: dondoli,
      categoryCode: 'CAT659'
    },
    {
      familyName: 'Sdraio e Lettini',
      image: sdraio,
      categoryCode: 'CAT658'
    },
    {
      familyName: 'Pergole',
      image: pergole,
      categoryCode: 'CAT676'
    },
    {
      familyName: 'Carport',
      image: carport,
      categoryCode: 'CAT4231'
    },
    {
      familyName: 'Divisori Giardino',
      image: divisori,
      categoryCode: 'CAT4097'
    }
  ]
};

export default world;
