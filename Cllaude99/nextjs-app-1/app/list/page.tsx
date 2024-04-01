'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { products } from '@/shared/const';

export default function List() {
  return (
    <Container>
      <Title>상품목록</Title>
      <ItemList>
        {products.map((item, index) => (
          <Item key={item.id}>
            <ItemImg
              src={`/imgs/food${index}.png`}
              alt={item.name}
              width={100}
              height={100}
            />
            {item.name} ${item.cost}
          </Item>
        ))}
      </ItemList>
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
const ItemList = styled.ul``;
const ItemImg = styled(Image)`
  width: 100%;
  height: auto;
`;
const Item = styled.li`
  width: 200px;
  background-color: white;
  color: black;
  margin: 10px;
  border-radius: 5px;
  padding: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
