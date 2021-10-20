// @flow strict
/** @jsx jsx */
import { jsx } from '@emotion/core';

export default function Card({ children }: {| children: React$Node |}) {
  return (
    <div
      css={{
        display: 'block',
        margin: '8px',
        padding: '16px',
        border: '1px solid white',
      }}
    >
      {children}
    </div>
  );
}
