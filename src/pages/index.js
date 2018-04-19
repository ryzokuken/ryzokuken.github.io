import React from 'react';
import styled, { injectGlobal } from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';

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
    font-size: 16px;

    @media (min-width: 400px) {
      font-size: 20px;
    }

    @media (min-width: 700px) {
      font-size: 24px;
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
  height: 100vh;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
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

const openLink = link => {
  window.open(link, '_blank');
};

export default () => (
  <Container>
    <Image src="/static/photo.png" />
    <Main>
      <div>
        <Header>Ujjwal "Ryzokuken" Sharma</Header>
        <h3>Web Developer &middot; Security Enthusiast &middot; FOSS Freak</h3>
        <p>
          I am a sophomore in Jaypee Institute of Information Technology, Noida, India. I love
          building experiences on the web. I like to contribute to open source projects and take
          interest in various domains of information security, especially cryptography.
        </p>
        <p>I design for fun.</p>
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
          />
        </div>
        <Button onClick={() => openLink('/static/ujjwal-cv-2017-2.pdf')}>My Resume</Button>
      </div>
    </Main>
  </Container>
);
