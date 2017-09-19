import configDev from '../config.dev';
import configStage from '../config.stage';
import { isDebugMode, isStageMode, isStageCatalog } from '../app/CommandLineOptions';

// eslint-disable-next-line
export const getApiConfig = () => {
  let apiConfig = process.env.config;

  if (isDebugMode) {
    apiConfig = configDev;
  }

  if (isStageMode) {
    apiConfig = configStage;
  }

  if (isStageCatalog) {
    apiConfig.apiConfig.spaceId = 'web-stg';
  }

  return apiConfig;
};
