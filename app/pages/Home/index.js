// @flow strict
import { Global, css } from '@emotion/core';
import React from 'react';

import Card from '../../primitives/Card';

function Layout({ children }: {| children: React$Node |}) {
  return (
    <div
      css={{
        backgroundColor: '#282c34',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
        color: 'white',
        resize: 'both',
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
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
      <Layout>
        <Card>
          <img
            css={{
              display: 'block',
              maxWidth: 995,
              maxHeight: 560,
              width: '100%',
              objectFit: 'cover',
              height: 'auto',
            }}
            src="https://3er1viui9wo30pkxh1v2nh4w-wpengine.netdna-ssl.com/wp-content/uploads/prod/sites/388/2018/05/limitedexperience_hero_animation-1024x576.gif"
            className="f-hero-image-inline"
            alt="Resume, devices, and creative tools on top of desk"
            srcSet="https://3er1viui9wo30pkxh1v2nh4w-wpengine.netdna-ssl.com/wp-content/uploads/prod/sites/388/2018/05/limitedexperience_hero_animation-1024x576.gif 1024w, https://3er1viui9wo30pkxh1v2nh4w-wpengine.netdna-ssl.com/wp-content/uploads/prod/sites/388/2018/05/limitedexperience_hero_animation-300x169.gif 300w, https://3er1viui9wo30pkxh1v2nh4w-wpengine.netdna-ssl.com/wp-content/uploads/prod/sites/388/2018/05/limitedexperience_hero_animation-768x432.gif 768w, https://3er1viui9wo30pkxh1v2nh4w-wpengine.netdna-ssl.com/wp-content/uploads/prod/sites/388/2018/05/limitedexperience_hero_animation-960x540.gif 960w, https://3er1viui9wo30pkxh1v2nh4w-wpengine.netdna-ssl.com/wp-content/uploads/prod/sites/388/2018/05/limitedexperience_hero_animation-480x270.gif 480w"
          />
          {/* <div
            css={{
              background:
                'url("https://3er1viui9wo30pkxh1v2nh4w-wpengine.netdna-ssl.com/wp-content/uploads/prod/sites/388/2018/05/limitedexperience_hero_animation-1024x576.gif")',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          ></div> */}
          asd
        </Card>
        <Card>zxc</Card>
      </Layout>
    </div>
  );
}
