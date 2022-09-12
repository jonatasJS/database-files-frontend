import styled from "styled-components";
import { BsArrowDown } from "react-icons/bs";

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Header = styled.text`
  display: flex;
  width: 100%;
  height: 89px;
  max-width: 400px;
  border-radius: 4px 4px 0 0;
  padding: 20px;
  margin-bottom: -30px;
  border-bottom: 1px solid rgba(0,0,0,.1);
  background-color: #fff;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 10px;
  
  h1 {
    font-size: 1.4rem;
    color: #000;
  }
`;

export const ArrowDown = styled(BsArrowDown)`
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 30px;
  border-top: 1px solid rgba(0,0,0,.1);
  border-radius: 0 0 4px 4px;
  background: #fff;
  padding: 20px;
`;
