import styled from "styled-components";

export const LoginPage = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;

export const Form = styled.div`
  position: relative;
  z-index: 1;
  border-radius: 10px;
  background: rgb(33, 35, 36);
  max-width: 100%;
  /* margin: 0 auto 100px; */
  height: 100%;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

  input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #52575a;
    color: rgba(255, 255, 255, 0.7);
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: 5px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    width: 100%;
    border: 0;
    background: #7159c1;
    border-radius: 5px;
    padding: 15px;
    color: #ffffff;
    font-size: 14px;
    -webkit-transition: background 0.5 ease-in-out;
    transition: background 0.5 ease-in-out;
    cursor: pointer;

    &:hover,
    &:active,
    &:focus {
      background: #8b74d7;
    }
  }
`;

export const ResetPassword = styled.a`
  color: #7159c1;
  font-size: 0.9rem;
  margin-top: -10px;
  margin-bottom: 20px;
  display: block;
  text-align: left;
  font-weight: bold;

  &:hover,
  &:active,
  &:focus {
    color: #8b74d7;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const FormMessage = styled.p`
  margin: 20px 0 -15px 0;
  color: #b3b3b3;
  font-size: 0.9rem;

  span {
    cursor: pointer;
    color: #7159c1;
    text-decoration: none;
    align-items: center;
    display: flex;
    justify-content: center;
    font-weight: bold;
    transform: color 0.5s ease-in-out;

    &:hover {
      color: #8b74d7;
    }
  }
`;
