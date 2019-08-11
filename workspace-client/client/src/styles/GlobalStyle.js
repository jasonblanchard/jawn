import { createGlobalStyle } from 'styled-components';

// TODO: Move App class to constants
const GlobalStyle = createGlobalStyle`
  html, body, .App {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  @font-face {
    font-family: MoonRegular;
    src: ${props => `url('${props.theme.appBasePath}/static/fonts/moon/Moon2.0-Regular.otf') format('opentype')`};
  }

  @font-face {
    font-family: MoonBold;
    src: ${props => `url('${props.theme.appBasePath}/static/fonts/moon/Moon2.0-Bold.otf') format('opentype')`};
  }

  @font-face {
    font-family: MoonLight;
    src: ${props => `url('${props.theme.appBasePath}/static/fonts/moon/Moon2.0-Light.otf') format('opentype')`};
  }

  @font-face {
    font-family: LoraCyrillicRegular;
    src: ${props => `url('${props.appBasePath}/static/fonts/lora-cyrillic/Lora-Regular.otf') format('opentype')`};
  }

  body {
    font-family: ${props => props.theme.fontFamily};
    font-size: ${props => props.theme.fontSizeMedium};
  }
`;

export default GlobalStyle;
