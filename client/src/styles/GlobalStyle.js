import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: MoonRegular;
    src: url('/static/fonts/moon/Moon2.0-Regular.otf') format('opentype');
  }

  @font-face {
    font-family: MoonBold;
    src: url('/static/fonts/moon/Moon2.0-Bold.otf') format('opentype');
  }

  @font-face {
    font-family: MoonLight;
    src: url('/static/fonts/moon/Moon2.0-Light.otf') format('opentype');
  }

  @font-face {
    font-family: LoraCyrillicRegular;
    src: url('/static/fonts/lora-cyrillic/Lora-Regular.otf') format('opentype');
  }

  body {
    font-family: ${props => props.theme.fontFamily};
    font-size: ${props => props.theme.fontSizeMedium};
  }
`;

export default GlobalStyle;
