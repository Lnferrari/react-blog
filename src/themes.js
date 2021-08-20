import { createGlobalStyle } from "styled-components"

export const lightTheme = {
  mainColor: 'white',
  secondColor: '#f6f6f6',
  text: 'black',
}

export const darkTheme = {
  mainColor: '#181818',
  secondColor: '#222222',
  text: 'white',
}

export const GlobalStyles = createGlobalStyle`
  body {
    width: 100vw;
    height: 100vh;
    background: ${({ theme }) => theme.secondColor};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;

    nav {
      background: ${({theme}) => theme.mainColor};

      button {
        color: ${({ theme }) => theme.text};
      }
    }

    section {
      .container {
        background: ${({theme}) => theme.mainColor};

        .post,
        form,
        .postCard {
          background: ${({ theme }) => theme.secondColor};

          input,
          textarea {
            background: ${({theme}) => theme.mainColor};
            color: ${({theme}) => theme.text};
          }

          button {
            background: ${({theme}) => theme.text};
            color: ${({theme}) => theme.mainColor};
          }

          .icons {
            color: ${({theme}) => theme.text};
          }

        }
      }
    }
  }
`