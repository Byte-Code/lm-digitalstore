import footer from '../app/assets/giardinoImg/00_Footer.png';
import texture from '../app/assets/giardinoImg/texture.png';
import stufePellet from '../app/assets/comfortImg/stufePellet.png';
import stufePetrolio from '../app/assets/comfortImg/stufePetrolio.png';
import stufeGas from '../app/assets/comfortImg/stufeGas.png';
import stufeLegna from '../app/assets/comfortImg/stufeLegna.png';
import stufeBioetanolo from '../app/assets/comfortImg/stufeBioetanolo.png';
import stufeElettiche from '../app/assets/comfortImg/stufeElettriche.png';
import pelletLegnaCombustibili from '../app/assets/comfortImg/pelletLegnaCombustibili.png';
import pompeCalore from '../app/assets/comfortImg/pompeCalore.png';
import radiatori from '../app/assets/comfortImg/radiatori.png';
import caldaieScaldabagni from '../app/assets/comfortImg/caldaieScaldabagni.png';
import termoarredi from '../app/assets/comfortImg/termoarredi.png';

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
      familyName: 'Stufe e Inserti a Pellet',
      image: stufePellet,
      categoryCode: 'CAT283'
    },
    {
      familyName: 'Stufe a Petrolio',
      image: stufePetrolio,
      categoryCode: 'CAT280'
    },
    {
      familyName: 'Stufe a Gas',
      image: stufeGas,
      categoryCode: 'CAT281'
    },
    {
      familyName: 'Stufe e Inserti a Legna',
      image: stufeLegna,
      categoryCode: 'CAT282'
    },
    {
      familyName: 'Stufe e Caminetti a Bioetanolo',
      image: stufeBioetanolo,
      categoryCode: 'CAT792'
    },
    {
      familyName: 'Stufe Elettriche',
      image: stufeElettiche,
      categoryCode: 'CAT290'
    },
    {
      familyName: 'Pellet, Legna, Petrolio e Bioetanolo',
      image: pelletLegnaCombustibili,
      categoryCode: 'CAT4231'
    },
    {
      familyName: 'Climatizzatori',
      image: pompeCalore,
      categoryCode: 'CAT4214'
    },
    {
      familyName: 'Radiatori',
      image: radiatori,
      categoryCode: 'CAT4231'
    },
    {
      familyName: 'Caldaie e Scaldabagni',
      image: caldaieScaldabagni,
      categoryCode: 'CAT4231'
    },
    {
      familyName: 'Termoarredi',
      image: termoarredi,
      categoryCode: 'CAT4231'
    }
  ]
};

export default world;
