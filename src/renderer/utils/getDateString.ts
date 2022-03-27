import { SupportedLangCode } from '../internationalisation/i18next';

export default function getDateString(
  timestamp: number,
  locale: SupportedLangCode
) {
  const date = new Date(timestamp);
  return date.toLocaleDateString(locale === 'en' ? 'en-GB' : locale, {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  });
}
