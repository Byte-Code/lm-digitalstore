import footer from '../app/assets/00_Footer.png';
import tavoliSedie from '../app/assets/01_TavoliSedie.png';
import carport from '../app/assets/02_Carport.jpg';
import panchine from '../app/assets/03_Panchine.jpg';
import sedie from '../app/assets/04_SediePoltrone.jpg';
import tavoli from '../app/assets/05_Tavoli.jpg';
import dondoli from '../app/assets/06_DondoliAmache.jpg';
import pergole from '../app/assets/07_Pergole.jpg';
import divisori from '../app/assets/08_DivisoriGiardino.png';
import ombrelloni from '../app/assets/09_OmbrelloniBasi.jpg';
import gazebo from '../app/assets/10_Gazebo.jpg';
import sdraio from '../app/assets/11_SdraioLettini.jpg';
import texture from '../app/assets/texture.png';

const world = {
  worldName: 'Comfort',
  title: 'Scopri le soluzioni per Comfort',
  trailingImage: footer,
  banner: {
    text: 'Scopri le funzioni del Digital Store',
    image: texture
  },
  families: [
    {
      familyName: 'Stufe a Pellet',
      image: tavoli,
      categoryCode: 'CAT283'
    },
    {
      familyName: 'Stufe a Legna',
      image: gazebo,
      categoryCode: 'CAT282'
    },
    {
      familyName: 'Stufe a petrolio',
      image: sedie,
      categoryCode: 'CAT280'
    },
    {
      familyName: 'Stufe Elettriche',
      image: panchine,
      categoryCode: 'CAT290'
    },
    {
      familyName: 'Stufe a Bioetanolo',
      image: dondoli,
      categoryCode: 'CAT792'
    },
    {
      familyName: 'Stufe a Gas',
      image: ombrelloni,
      categoryCode: 'CAT281'
    },
    {
      familyName: 'Termoarredi',
      image: tavoliSedie,
      categoryCode: 'CAT52'
    },
    {
      familyName: 'Radiatori',
      image: sdraio,
      categoryCode: 'CAT286'
    },
    {
      familyName: 'Pompe di Calore',
      image: pergole,
      categoryCode: 'CAT4214'
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
