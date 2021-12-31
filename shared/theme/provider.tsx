import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

import { theme } from './theme';

export const ThemeProvider: React.FC = ({ children }) => (
  <ChakraProvider theme={theme}>
    {children}
  </ChakraProvider>
);
