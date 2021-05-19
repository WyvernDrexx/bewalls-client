type COLOR_SCHEME = {
  primary: string;
  secondary: string;
};

const LIGHT_COLOR_SCHEME: COLOR_SCHEME = {
  primary: 'white',
  secondary: 'black',
};

const getColorScheme = (): COLOR_SCHEME => {
  return LIGHT_COLOR_SCHEME;
};

export default getColorScheme;
