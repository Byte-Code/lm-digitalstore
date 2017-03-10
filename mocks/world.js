import footer from '../app/assets/00_Footer.png';
import texture from '../app/assets/texture.png';

const image0 = require('../app/assets/01_TavoliSedie.png');
const image1 = require('../app/assets/03_Panchine.png');
const image2 = require('../app/assets/04_SediePoltrone.png');
const image3 = require('../app/assets/05_Tavoli.png');
const image4 = require('../app/assets/06_DondoliAmache.png');
const image5 = require('../app/assets/07_Pergole.png');
const image6 = require('../app/assets/08_DivisoriGiardino.png');
const image7 = require('../app/assets/09_OmbrelloniBasi.png');
const image8 = require('../app/assets/10_Gazebo.png');
const image9 = require('../app/assets/11_SdraioLettini.png');

const world = {
  worldName: 'Giardino e Terrazzo',
  title: 'Scopri le soluzioni per Giardino e Terrazzo',
  trailingImage: footer,
  banner: {
    text: 'Scopri i prodotti per dare nuovo spazio alle tue piante',
    image: texture
  },
  families: [
    {
      familyName: 'Set di tavoli e sedie',
      image: image0,
      areaId: 0,
      itemCount: 73
    },
    {
      familyName: 'Sedie e Poltrone',
      image: image1,
      areaId: 1,
      itemCount: 208
    },
    {
      familyName: 'Tavoli',
      image: image2,
      areaId: 2,
      itemCount: 182
    },
    {
      familyName: 'Panchine',
      image: image3,
      areaId: 3,
      itemCount: 37
    },
    {
      familyName: 'Dondoli e Amache',
      image: image4,
      areaId: 4,
      itemCount: 16
    },
    {
      familyName: 'Pergole',
      image: image5,
      areaId: 5,
      itemCount: 36
    },
    {
      familyName: 'Divisori Giardino',
      image: image6,
      areaId: 6,
      itemCount: 139
    },
    {
      familyName: 'Gazebo',
      image: image7,
      areaId: 7,
      itemCount: 34
    },
    {
      familyName: 'Ombrelloni e Basi',
      image: image8,
      areaId: 8,
      itemCount: 103
    },
    {
      familyName: 'Sdraio e Lettini',
      image: image9,
      areaId: 9,
      itemCount: 99
    }
  ]
};

export default world;
