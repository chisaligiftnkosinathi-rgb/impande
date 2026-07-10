import { config } from './config';

export const isDevelopment = config.NODE_ENV === 'development';
export const isTest = config.NODE_ENV === 'test';
export const isStaging = config.NODE_ENV === 'staging';
export const isProduction = config.NODE_ENV === 'production';

export const isLocal = isDevelopment || isTest;
