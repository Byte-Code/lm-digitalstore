import footer from '../app/assets/comfortImg/footer.png';
import texture from '../app/assets/comfortImg/texture.png';
import stufeGas from '../app/assets/comfortImg/stufeGas.png';
import stufeBioetanolo from '../app/assets/comfortImg/stufeBioetanolo.png';
import radiatori from '../app/assets/comfortImg/radiatori.png';
import termoarredi from '../app/assets/comfortImg/termoarredi.png';
import caldaieScaldabagniSquare from '../app/assets/comfortImg/square/caldaieScaldabagni_square.png';
import stufePetrolioSquare from '../app/assets/comfortImg/square/stufePetrolio_square.jpg';
import pelletLegnaCombustibiliSquare from '../app/assets/comfortImg/square/pelletLegnaCombustibili_square.png';
import stufeLegnaSquare from '../app/assets/comfortImg/square/stufeLegna_square.png';
import stufePelletSquare from '../app/assets/comfortImg/square/stufePellet_square.png';
import stufeTermoventilatoriElettrici from '../app/assets/comfortImg/stufeTermoventilatoriElettrici.jpg';
import termoconvettoriTermosifoniElettrici from '../app/assets/comfortImg/termoconvettoriTermosifoniElettrici.jpg';
import riscaldamentoElettricoEsterno from '../app/assets/comfortImg/riscaldamentoElettricoEsterno.jpg';
import termofunghiEsterno from '../app/assets/comfortImg/termofunghiEsterno.jpg';

import video from '../app/assets/videos/DS_Splash02.mp4';

const world = {
  worldName: 'Comfort',
  worldTemplateName: 'Comfort2020',
  screenSaverVideo: video,
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
      image: stufePelletSquare,
      categoryCode: 'CAT4278'
    },
    {
      familyName: 'Stufe a Petrolio',
      image: stufePetrolioSquare,
      categoryCode: 'CAT280'
    },
    {
      familyName: 'Stufe a Gas',
      image: stufeGas,
      categoryCode: 'CAT281'
    },
    {
      familyName: 'Stufe e Inserti a Legna',
      image: stufeLegnaSquare,
      categoryCode: 'CAT4277'
    },
    {
      familyName: 'Stufe, caminetti e bruciatori a bioetanolo',
      image: stufeBioetanolo,
      categoryCode: 'CAT792'
    },
    {
      familyName: 'Pellet, Legna, Petrolio e Bioetanolo',
      image: pelletLegnaCombustibiliSquare,
      categoryCode: 'CAT4275'
    },
    {
      familyName: 'Termoarredi',
      image: termoarredi,
      categoryCode: 'CAT52'
    },
    {
      familyName: 'Termosifoni',
      image: radiatori,
      categoryCode: 'CAT286'
    },
    {
      familyName: 'Caldaie e Scaldabagni',
      image: caldaieScaldabagniSquare,
      categoryCode: 'CAT4276'
    },
    {
      familyName: 'Stufette elettriche',
      image: stufeTermoventilatoriElettrici,
      categoryCode: 'CAT290'
    },
    {
      familyName: 'Termosifoni e pannelli radianti',
      image: termoconvettoriTermosifoniElettrici,
      categoryCode: 'CAT4467'
    },
    {
      familyName: 'Riscaldamento elettrico da esterno',
      image: riscaldamentoElettricoEsterno,
      categoryCode: 'CAT4457'
    },
    {
      familyName: 'Termofunghi da esterno',
      image: termofunghiEsterno,
      categoryCode: 'CAT4621'
    },
  ]
};

export default world;
