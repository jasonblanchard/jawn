import styled from 'styled-components';

// TODO: Make these more composable

const Button = styled.button`
  font-family: ${props => props.theme.fontFamily};
  border-radius: ${props => props.theme.borderRadiusSmall};
  font-size: ${props => props.theme.fontSizeMedium};
  cursor: pointer;

  &:disabled {
    cursor: inherit;
    background-color: ${props => props.theme.colorAccentDisabled};
    border: ${props => props.theme.borderThin} solid ${props => props.theme.colorAccent};
  }
`;

export const PrimaryButton = styled(Button)`
  background: ${props => props.theme.colorAccent};
  color: ${props => props.theme.textLightest};
  border: ${props => props.theme.borderThin} solid ${props => props.theme.colorAccentBorder};

  &:disabled {
    background-color: ${props => props.theme.colorAccentDisabled};
    border: ${props => props.theme.borderThin} solid ${props => props.theme.colorAccent};
  }
`;

export const DangerButton = styled(Button)`
  background: ${props => props.theme.colorDanger};
  color: ${props => props.theme.textLightest};
  border: ${props => props.theme.borderThin} solid ${props => props.theme.fontColorLightest};
`;

export const MinimalButton = styled(Button)`
  background: none;
  border: 0;

  &:hover {
    text-decoration: underline;
  }
`;
