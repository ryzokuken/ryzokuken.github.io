import React from 'react';
import styled, { injectGlobal } from 'styled-components';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faEnvelope, faGithub, faTwitter, faLinkedin);

injectGlobal`
  body {
    margin: 0;
    background: var(--yellow);
    color: var(--indigo) !important;
  }

  :root {
    --indigo: #3F51B5;
    --yellow: #FFEB3B;
  }

  html {
    font-size: 16px !important;

    @media (min-width: 400px) {
      font-size: 20px !important;
    }

    @media (min-width: 700px) {
      font-size: 24px !important;
    }
  }
`;

const Container = styled.div`
  display: flex;
  text-align: center;
`;

const Image = styled.img`
  width: auto;
  height: 100vh;
  margin: 0;
  display: none;

  @media (min-width: 1079px) {
    display: block;
  }
`;

const Main = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 5%;
  min-height: 100vh;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const TopMain = styled(Main)`
  border-left: 2px solid var(--indigo);
  border-bottom: 2px solid var(--indigo);
`;

const Header = styled.h1`
  font-size: 2.4rem;
`;

const StyledFAIcon = styled(FontAwesomeIcon)`
  font-size: 2rem;
  margin: 0.5rem;
  transition: all 0.2s ease-in-out;
  stroke: var(--indigo);

  &:hover {
    transform: scale(1.4);
    color: var(--yellow);
    stroke-width: 12px;
  }
`;

const Button = styled.button`
  background: var(--indigo);
  border: none;
  color: white;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  transition: all 0.2s ease-in-out;
  border: 2px solid var(--indigo);

  &:hover {
    background: var(--yellow);
    color: var(--indigo);
    transform: scale(1.1);
  }
`;

const Logo = styled.img`
  width: 200px;
  margin: 50px;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const openLink = link => {
  window.open(link, '_blank');
};

export default () => (
  <div>
    <Container>
      <Image src="/static/photo.png" />
      <TopMain>
        <div>
          <Header>Ujjwal "Ryzokuken" Sharma</Header>
          <h3>Open-Source Wizard &middot; JavaScript Aficionado</h3>
          <p>
            I am an undergrad student, an open source fanatic and an active member of the JavaScript
            ecosystem.
          </p>
          <p>
            A Node.js core collaborator, Electron maintainer, Google Summer of Code mentor and
            ex-student, I’ve been working on V8 and TC39 to help make JavaScript better, one commit
            at a time.
          </p>
          <div>
            <StyledFAIcon
              icon={['fab', 'twitter']}
              onClick={() => openLink('https://twitter.com/ryzokuken')}
            />
            <StyledFAIcon
              icon={['fab', 'github']}
              onClick={() => openLink('https://github.com/ryzokuken')}
            />
            <StyledFAIcon
              icon={['fab', 'linkedin']}
              onClick={() => openLink('https://www.linkedin.com/in/ryzokuken/')}
            />
            <StyledFAIcon
              icon="envelope"
              onClick={() => openLink('mailto://usharma1998@gmail.com')}
            />
            {/* <StyledFAIcon
            icon={['fab', 'free-code-camp']}
            onClick={() => openLink('https://www.freecodecamp.org/ryzokuken')}
          />
          <StyledFAIcon
            icon={['fab', 'stack-overflow']}
            onClick={() => openLink('https://stackoverflow.com/story/ryzokuken')}
          />
          <StyledFAIcon
            icon={['fab', 'codepen']}
            onClick={() => openLink('https://codepen.io/ryzokuken/')}
          /> */}
          </div>
          <Button onClick={() => openLink('/static/ujjwal-cv-2018-9.pdf')}>My Resume</Button>
        </div>
      </TopMain>
    </Container>
    <Container>
      <Main>
        <div>
          <Header>Open Source</Header>
          <div>
            <Logo src="/static/logo-node.svg" />
            <Logo src="/static/logo-electron.svg" />
            <Logo src="/static/logo-v8.svg" />
            <Logo src="/static/logo-tc39.svg" />
            <Logo src="/static/logo-libuv.png" />
            <Logo src="/static/logo-publiclab.svg" />
          </div>
        </div>
      </Main>
    </Container>
  </div>
);
