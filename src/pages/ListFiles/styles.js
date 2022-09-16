import styled, { keyframes } from "styled-components";

export const Header = styled.header`
  display: flex;
  width: 100%;
  height: 89px;
  border-radius: 4px 4px 0 0;
  padding: 20px;
  margin-bottom: -30px;
  border-bottom: 1px solid rgba(159, 148, 132, 0.1);
  background-color: rgb(33, 35, 36);
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: 10px;

  h1 {
    font-size: 1.4rem;
    color: rgb(255, 255, 254);
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 30px;
  border-top: 1px solid rgba(159, 148, 132, 0.1);
  border-radius: 0 0 4px 4px;
  background: rgb(33, 35, 36);
  padding: 20px;
`;

const arrowDownAnim = keyframes`
  from {
    transform: translateY(-5px);
  }

  to {
    transform: translateY(5px)
  }
`;

export const ArrowDown = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${arrowDownAnim} ${(props) => props.teste}s infinite alternate
    linear;
`;

export const Footer = styled.footer`
  background-color: rgb(33, 35, 36);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
`;

export const CopyrighArea = styled.div`
  padding: 25px 0;
  text-align: center;
`;

export const CopyrighText = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;

  p {
    margin: 0;
    font-size: 14px;
    color: rgb(255, 255, 254);

    a {
      color: #b29bff;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
