
```tsx
// GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Other global styles */
  
  @media (max-width: 1024px) {
    /* Media query for smaller screens */
    body {
      overflow: hidden; /* Prevent scrolling on smaller screens */
    }
  }
`;

export default GlobalStyles;

```

```tsx
// Page.tsx
import React from 'react';
import Header from './Header';
import styled from 'styled-components';

const InnerStyles = styled.div`
  /* Inner styles */
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Message = styled.h1`
  font-size: 24px;
`;

const LaptopScreenSize = 1024;

interface PageProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  const isSmallScreen = window.innerWidth < LaptopScreenSize;

  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>
        {isSmallScreen ? (
          <Container>
            <Message>Please use a bigger screen</Message>
          </Container>
        ) : (
          children
        )}
      </InnerStyles>
    </div>
  );
};

export default Page;

```