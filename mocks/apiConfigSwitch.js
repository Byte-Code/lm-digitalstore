import configDev from '../config.dev';
import configStage from '../config.stage';
import { isDebugMode, isStageMode } from '../app/CommandLineOptions';

const getApiConfig = () => {
  let apiConfig = process.env.config;

  if (isDebugMode) {
    apiConfig = configDev;
  }

  if (isStageMode) {
    apiConfig = configStage;
  }

  return apiConfig;
};

module.export = { getApiConfig };
