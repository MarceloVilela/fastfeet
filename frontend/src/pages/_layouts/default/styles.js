import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  min-height: 100%;
  background: #eee;
  /*opacity: 0.2;*/

  button {
    width: 100%;
    height: 44px;
    margin: 10px 0 0;
    background: #cccccc;
    background: #7D40E6;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#000000')};
      background: ${darken(0.03, '#7D40E6')};
    }

    &.warning,
    &.info {
      width: inherit;
      height: inherit;
      margin: 0;
      font-weight: inherit;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
    }

    &.warning:hover,
    &.info:hover {
      background: #fff;
    }

    &.warning {
      background: #fff;
      color: #f64c75;
    }

    &.info {
      background: #fff;
      color: #0000ff;
    }
  }
`;
