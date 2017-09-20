import footer from '../app/assets/comfortImg/footer.png';
import texture from '../app/assets/comfortImg/texture.png';
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
  title: 'Esplora le soluzioni per',
  titleSuffix: 'Stufe, climatizzatori e idraulica',
  trailingImage: footer,
  banner: {
    text: 'Scopri le funzioni del Digital Store',
    image: texture
  },
  families: [
    {
      familyName: 'Stufe e Inserti a Pellet',
      image: stufePellet,
      categoryCode: 'CAT4278'
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
      categoryCode: 'CAT4277'
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
      categoryCode: 'CAT4275'
    },
    {
      familyName: 'Climatizzatori',
      image: pompeCalore,
      categoryCode: 'CAT3219'
    },
    {
      familyName: 'Radiatori',
      image: radiatori,
      categoryCode: 'CAT286'
    },
    {
      familyName: 'Caldaie e Scaldabagni',
      image: caldaieScaldabagni,
      categoryCode: 'CAT4276'
    },
    {
      familyName: 'Termoarredi',
      image: termoarredi,
      categoryCode: 'CAT52'
    }
  ]
};

export default world;
