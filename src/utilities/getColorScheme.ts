type COLOR_SCHEME = {
  primary: string;
  secondary: string;
  light: string;
};

const LIGHT_COLOR_SCHEME: COLOR_SCHEME = {
  primary: 'white',
  secondary: 'black',
  light: '#F7F7F7',
};

const getColorScheme = (): COLOR_SCHEME => {
  return LIGHT_COLOR_SCHEME;
};

export default getColorScheme;
