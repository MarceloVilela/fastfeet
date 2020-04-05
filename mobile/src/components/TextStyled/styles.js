import styled from 'styled-components/native';
import { color } from '~/styles/values.js';

const format = {
  primary: `
    color: ${color.primary};
    font-size: 16px;
    font-weight: bold;
  `,

  definitionTitle: `
    font-weight: bold;
    color: #999;
  `,

  definitionData: `
    color: #666;
  `,

  title: `
    color: #666;
    font-size: 20px;
    font-weight: bold;
    color: #666;
  `,

  subtitle: `
    font-weight: bold;
    color: #999;
  `,
}

export const StyledText = styled.Text`
  ${props => props.format && format[props.format] ? format[props.format] : ''}
`;
