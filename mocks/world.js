import footer from '../app/assets/00_Footer.png';
import tavoliSedie from '../app/assets/01_TavoliSedie.png';
import carport from '../app/assets/02_Carport.png';
import panchine from '../app/assets/03_Panchine.png';
import sedie from '../app/assets/04_SediePoltrone.png';
import tavoli from '../app/assets/05_Tavoli.png';
import dondoli from '../app/assets/06_DondoliAmache.png';
import pergole from '../app/assets/07_Pergole.png';
import divisori from '../app/assets/08_DivisoriGiardino.png';
import ombrelloni from '../app/assets/09_OmbrelloniBasi.png';
import gazebo from '../app/assets/10_Gazebo.png';
import sdraio from '../app/assets/11_SdraioLettini.png';
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
      itemCount: 73
    },
    {
      familyName: 'Sedie e Poltrone',
      image: sedie,
      areaId: 1,
      itemCount: 208
    },
    {
      familyName: 'Tavoli',
      image: tavoli,
      areaId: 2,
      itemCount: 182
    },
    {
      familyName: 'Panchine',
      image: panchine,
      areaId: 3,
      itemCount: 37
    },
    {
      familyName: 'Dondoli e Amache',
      image: dondoli,
      areaId: 4,
      itemCount: 16
    },
    {
      familyName: 'Pergole',
      image: pergole,
      areaId: 5,
      itemCount: 36
    },
    {
      familyName: 'Divisori Giardino',
      image: divisori,
      areaId: 6,
      itemCount: 139
    },
    {
      familyName: 'Gazebo',
      image: gazebo,
      areaId: 7,
      itemCount: 34
    },
    {
      familyName: 'Ombrelloni e Basi',
      image: ombrelloni,
      areaId: 8,
      itemCount: 103
    },
    {
      familyName: 'Sdraio e Lettini',
      image: sdraio,
      areaId: 9,
      itemCount: 99
    },
    {
      familyName: 'Carport',
      image: carport,
      areaId: 10,
      itemCount: 3
    }
  ]
};

export default world;
