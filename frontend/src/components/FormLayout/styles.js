import styled from 'styled-components';

export const Wrap = styled.div`
  form {
    background: #fff;
    min-width: 480px;
    padding: 10px 20px;
    margin: 50px 0;

    section {
      margin-bottom: 30px;

      & + section {
        margin-left: 30px;
      }
    }

    & > div {
      display: flex;
      /*margin-bottom: 30px;*/
      flex-wrap: wrap;

      & > section {
        flex: 1;
        /*flex-basis: 100%;*/
        display: flex;
        flex-direction: column;

        & > label {
          text-align: left;
        }

        input,
        select,
        textarea,
        label {
          font-size: 15px;
        }

        input,
        select,
        textarea {
          border: 2px solid #ccc;
          border-radius: 6px;
          color: #666;
          width: 100%;
        }

        input,
        select {
          height: 34px;
        }

        input + span,
        select + span,
        textarea + span {
          color: #f64c75;
        }

        div[class$='container'],
        div[class$='control'],
        div[class$='control'] > div {
          height: 34px;
          min-height: 34px;
          align-content: center;
        }

        input[readOnly],
        select[readOnly] {
          background-color: #ddd;
        }
      }
    }

    label.avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: auto;
      background: #fff;
      color: #999;
      margin: 0 auto 50px;

      input[type="file"] {
        display: none;
      }

      svg, img {
        width: 96px;
        height: 96px;
        border-radius: 50%;
      }

      /* hide icon after select file */
      img + input[type="file"] {
        display: none;
      }

      /* hide icon on edit */
      img + input[type="file"] + svg, img + svg {
        display: none;
      }

      /* hide description on edit */
      img + svg + span {
        display: none;
      }

      /* hide old image after select new file on edit */
      img + input + img {
        display: none;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    form {
      min-width: inherit;
    }
  }
`;
