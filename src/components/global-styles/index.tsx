import * as React from 'react';
import './GlobalStyles.scss';

interface IGlobalStyles {
  children: JSX.Element;
}

const GlobalStyles: React.FunctionComponent<IGlobalStyles> = ({ children }) => {
  return children;
};

export default GlobalStyles;
