'use client';

import { useState } from 'react';
import styled from 'styled-components';

export default function Home() {
  const [name, setName] = useState('Cllaude99');

  return (
    <Container>
      <Title>애플후레시</Title>
      <SubTitle>by dev {name}</SubTitle>
    </Container>
  );
}

const Container = styled.div``;
const Title = styled.h4`
  text-align: center;
  margin: 50px 0px;
`;
const SubTitle = styled.p`
  text-align: center;
`;
