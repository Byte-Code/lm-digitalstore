const argv = require('electron').remote.process.argv;

export const isDebugMode = argv.indexOf('--debug');
export const isDevToolMode = argv.indexOf('--dev-tool');
