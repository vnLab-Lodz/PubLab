export enum TEMPLATE_URLS {
  PAAW_I18N = 'https://github.com/vnLab-Lodz/gatsby-starter-paaw-i18n',
  PAAW_BASIC = 'https://github.com/vnLab-Lodz/gatsby-starter-paaw-basic',
}

export default function getTemplateUrl(
  useSass: boolean,
  useTypescript: boolean
) {
  return useSass && useTypescript
    ? TEMPLATE_URLS.PAAW_I18N
    : TEMPLATE_URLS.PAAW_BASIC;
}
