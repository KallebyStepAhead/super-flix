import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const themeConfig: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

export const theme = extendTheme({
  config: themeConfig,
});
