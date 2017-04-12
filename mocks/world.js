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
    text: 'Scopri le funzioni del Digital Store',
    image: texture
  },
  families: [
    {
      familyName: 'Tavoli',
      image: tavoli,
      areaId: 2,
      categoryCode: 'CAT657'
    },
    {
      familyName: 'Gazebo',
      image: gazebo,
      areaId: 7,
      categoryCode: 'CAT944'
    },
    {
      familyName: 'Sedie e Poltrone',
      image: sedie,
      areaId: 1,
      categoryCode: 'CAT657'
    },
    {
      familyName: 'Panchine',
      image: panchine,
      areaId: 3,
      categoryCode: 'CAT945'
    },
    {
      familyName: 'Dondoli e Amache',
      image: dondoli,
      areaId: 4,
      categoryCode: 'CAT659'
    },
    {
      familyName: 'Ombrelloni e Basi',
      image: ombrelloni,
      areaId: 8,
      categoryCode: 'CAT660'
    },
    {
      familyName: 'Set di tavoli e sedie',
      image: tavoliSedie,
      areaId: 0,
      categoryCode: 'CAT655'
    },
    {
      familyName: 'Sdraio e Lettini',
      image: sdraio,
      areaId: 9,
      categoryCode: 'CAT658'
    },
    {
      familyName: 'Pergole',
      image: pergole,
      areaId: 5,
      categoryCode: 'CAT676'
    },
    {
      familyName: 'Carport',
      image: carport,
      areaId: 10,
      categoryCode: 'CAT4231'
    },
    {
      familyName: 'Divisori Giardino',
      image: divisori,
      areaId: 6,
      categoryCode: 'CAT4097'
    }
  ]
};

export default world;
