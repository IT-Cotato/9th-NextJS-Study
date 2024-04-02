'use client';

import Link from 'next/link';
import styled from 'styled-components';

export default function Header() {
  return (
    <Nav>
      <Col>
        <Items>
          <Item>
            <Link href={`/`}>홈 </Link>
          </Item>
          <Item>
            <Link href={`/list`}>List</Link>
          </Item>
          <Item>
            <Link href={`/cart`}>Cart</Link>
          </Item>
        </Items>
      </Col>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.white.lighter};
  color: ${(props) => props.theme.black.darker};
  height: 50px;
`;
const Col = styled.div``;
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  margin: 0px 20px;
`;
