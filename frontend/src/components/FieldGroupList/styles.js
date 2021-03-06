import styled from 'styled-components';

export const FieldGroup = styled.div`
  display: flex;
  align-items: baseline;
  margin: 50px 0 30px 0;
  flex-wrap: wrap;

  h1 {
    flex: 1;
    text-align: left;
    align-self: center;
    flex-basis: 100%;
    font-weight: 500;
  }

  article {
    display: flex;
    flex: 1;
    margin-top: 20px;
    /*flex: 1;
    flex-direction: row-reverse;
    justify-content: space-between;*/

    a + button {
      margin-left: 10px;
    }

    button {
      width: inherit;
      height: 34px;
      padding: 0 20px;
      margin: 0;

      display: flex;
      align-items: center;

      &.back {
        background-color: #ccc;
      }

      & + button {
        margin-left: 10px;
      }
    }

    div {
      align-self: start;
      flex: 1;
    }

    @media screen and (max-width: 1024px) {
      div input {
        min-width: inherit;
        width: 100%;
      }
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;

  input {
    padding-left: 20px;
    height: 34px;
    border-radius: 4px;
    border: 1px solid #999;
    color: #999;
    min-width: 240px;
    position: relative;
    left: -14px;
  }
`;
