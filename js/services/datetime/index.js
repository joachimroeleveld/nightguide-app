import dateFnsFormat from 'date-fns/format';

import { i18n } from '../i18n';
import localeEn from 'date-fns/locale/en';

const locales = {
  en: localeEn,
};

export default function format(date, formatStr) {
  return dateFnsFormat(date, formatStr, {
    locale: locales[i18n.currentLocale()],
  });
}