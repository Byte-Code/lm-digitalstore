import footer from '../app/assets/00_Footer.png';
import tavoliSedie from '../app/assets/01_TavoliSedie.jpg';
import carport from '../app/assets/02_Carport.jpg';
import panchine from '../app/assets/03_Panchine.jpg';
import sedie from '../app/assets/04_SediePoltrone.jpg';
import tavoli from '../app/assets/05_Tavoli.jpg';
import dondoli from '../app/assets/06_DondoliAmache.jpg';
import pergole from '../app/assets/07_Pergole.jpg';
import divisori from '../app/assets/08_DivisoriGiardino.jpg';
import ombrelloni from '../app/assets/09_OmbrelloniBasi.jpg';
import gazebo from '../app/assets/10_Gazebo.jpg';
import sdraio from '../app/assets/11_SdraioLettini.jpg';
import texture from '../app/assets/texture.png';

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
      image: tavoliSedie,
      areaId: 0,
      itemCount: 73,
      categoryCode: 'CAT656'
    },
    {
      familyName: 'Sedie e Poltrone',
      image: sedie,
      areaId: 1,
      itemCount: 208,
      categoryCode: 'CAT657'
    },
    {
      familyName: 'Tavoli',
      image: tavoli,
      areaId: 2,
      itemCount: 182,
      categoryCode: 'CAT655'
    },
    {
      familyName: 'Panchine',
      image: panchine,
      areaId: 3,
      itemCount: 37,
      categoryCode: 'CAT655'
    },
    {
      familyName: 'Dondoli e Amache',
      image: dondoli,
      areaId: 4,
      itemCount: 16,
      categoryCode: 'CAT655'
    },
    {
      familyName: 'Pergole',
      image: pergole,
      areaId: 5,
      itemCount: 36,
      categoryCode: 'CAT655'
    },
    {
      familyName: 'Divisori Giardino',
      image: divisori,
      areaId: 6,
      itemCount: 139,
      categoryCode: 'CAT655'
    },
    {
      familyName: 'Gazebo',
      image: gazebo,
      areaId: 7,
      itemCount: 34,
      categoryCode: 'CAT655'
    },
    {
      familyName: 'Ombrelloni e Basi',
      image: ombrelloni,
      areaId: 8,
      itemCount: 103,
      categoryCode: 'CAT655'
    },
    {
      familyName: 'Sdraio e Lettini',
      image: sdraio,
      areaId: 9,
      itemCount: 99,
      categoryCode: 'CAT655'
    },
    {
      familyName: 'Carport',
      image: carport,
      areaId: 10,
      itemCount: 3,
      categoryCode: 'CAT655'
    }
  ]
};

export default world;
