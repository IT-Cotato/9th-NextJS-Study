'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { products } from '@/shared/const';
import { useState } from 'react';

export default function List() {
  const [productNum, setProductNum] = useState([0, 0, 0]);

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
            <h4>
              {item.name} ${item.cost}
            </h4>
            <span>
              {productNum[index]}{' '}
              <button
                onClick={() =>
                  setProductNum((prev) => {
                    const new_arr = [...prev];
                    new_arr[index] += 1;
                    return new_arr;
                  })
                }
              >
                +
              </button>
            </span>
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
const ItemList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  width: 80vw;
`;
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
