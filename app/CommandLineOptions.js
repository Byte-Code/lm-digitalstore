import remove from 'lodash/remove';
import startsWith from 'lodash/startsWith';
import trimStart from 'lodash/trimStart';

const argv = require('electron').remote.process.argv;

const getOption = prefix => {
  const argvClone = argv.slice();
  const prefixString = `${prefix}=`;
  const onlyOptionInList = remove(argvClone, (value) => startsWith(value, prefixString));
  return onlyOptionInList.length > 0 ? trimStart(onlyOptionInList[0], prefixString) : '';
};

export const isDebugMode = argv.indexOf('--debug') > 0;
export const isDevToolMode = argv.indexOf('--dev-tool') > 0;
export const isAnalyticsLogMode = argv.indexOf('--log-analytics') > 0;
export const isStageMode = argv.indexOf('--stage') > 0;
export const luckyOrangeID = Number.parseInt(getOption('--luckyOrangeID'));
