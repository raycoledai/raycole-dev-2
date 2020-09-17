// @flow strict
/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core';

import logo from './logo.svg';

function AppHeader() {
  return (
    <header
      css={{
        backgroundColor: '#282c34',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `calc(10px + 2vmin)`,
        color: 'white',
      }}
    >
      <img
        css={{
          height: '40vmin',
          pointerEvents: 'none',
        }}
        src={logo}
        alt={'logo'}
      />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        css={{ color: '#61dafb' }}
        href={'https://reactjs.org'}
        target={'_blank'}
        rel={'noopener noreferrer'}
      >
        Learn React
      </a>
    </header>
  );
}

function App() {
  return (
    <div>
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            textalign: center;
          }
        `}
      />
      <AppHeader />
    </div>
  );
}

export default App;
