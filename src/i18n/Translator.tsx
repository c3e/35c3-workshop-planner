import * as EN from './en.json';
import * as DE from './de.json';
import AppSettings from '../helper/AppSettings';
import { AvailableLanguages } from './AvailableLanguages';
import LOGGER from '../utils/Logger';

export default function t(text: string): string {
  let currentLanguage: any = EN;

  switch (AppSettings.LANGUAGE) {
    case (AvailableLanguages.en):
      currentLanguage = EN;
      break;
    case (AvailableLanguages.de):
      currentLanguage = DE;
      break;
    default: {
      currentLanguage = EN;
    }
  }

  if (!currentLanguage.hasOwnProperty(text)) {
    LOGGER.info(`Missing translation for key: "${text}"`);
    return text;
  } else {
    return currentLanguage[text];
  }
}
