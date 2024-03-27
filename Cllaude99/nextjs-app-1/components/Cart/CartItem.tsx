'use client';

import styled from 'styled-components';

export default function CartItem({
  name,
  cost,
  num,
}: {
  name: string;
  cost: number;
  num: number;
}) {
  return (
    <Items>
      <span>{name}</span>
      <span>${cost}</span>
      <span>{num}개</span>
    </Items>
  );
}

const Items = styled.li`
  display: flex;
  span {
    margin: 0px 10px;
  }
`;
