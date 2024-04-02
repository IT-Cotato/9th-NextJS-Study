'use client';

import CartItem from '@/components/Cart/CartItem';
import { products } from '@/shared/const';
import styled from 'styled-components';

export default function Cart() {
  return (
    <Container>
      <Title>Cart</Title>
      <MenuList>
        {products.map((item) => (
          <CartItem name={item.name} cost={item.cost} num={item.num} />
        ))}
      </MenuList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h4`
  margin: 50px 0px;
`;
const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  gap: 10px;
`;
