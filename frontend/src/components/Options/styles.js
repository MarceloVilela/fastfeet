import styled from 'styled-components';


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  position: absolute;
  right: 20px;
  z-index: 9;
  padding: 10px 50px 10px 10px;
  background: #FFF;

  label + label {
    margin-top: 10px;
  }
`;

export const Item = styled.label`
  cursor: pointer;

  a {
      text-decoration: none;
      color: #ccc;
  }

  svg {
    margin-right: 10px;
  }

  &.info {
    svg {
      color: #7D40E6;
    }
  }

  &.edit {
    svg {
      color: #0000ff;
    }
  }

  &.delete {
    svg {
      color: #f64c75;
    }
  }
`;

export const Description = styled.span`
  color: #999;
`;
