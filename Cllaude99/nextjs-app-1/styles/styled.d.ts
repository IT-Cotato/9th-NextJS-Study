import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    red: string;
    black: {
      main: string;
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      lighter: string;
      darker: string;
    };
  }
}
