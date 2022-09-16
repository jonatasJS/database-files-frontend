import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.ul)`
  box-shadow: inset 0 0 5px #000;
  border-radius: 10px;
  margin-top: 20px;
  max-height: 300px;
  overflow-x: auto;
  overflow-y: none;
  scroll-behavior: smooth;
  z-index: -1;

  li {
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(213, 206, 198);
    outline: 0.5px solid rgba(135, 125, 112, 0.3);
    background-color: #323536;

    /* & + li {
      margin-top: 15px;
    } */
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: rgb(6 6 6 / 30%) 0px 0px 1px inset;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background-color: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar {
    width: 12px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background-color: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-thumb {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    -webkit-box-shadow: inset 0 0 0px 1px rgba(0, 0, 0, 0.3);
    background-color: #52575a;
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const FileInfoData = styled.div`
  display: flex;
  flex-direction: column;

  a {
    font-size: 12px;
    font-weight: 500;
    color: rgb(213, 206, 198);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    font-size: 12px;
    color: rgb(190, 181, 169);
    margin-top: 5px;
  }
`;

export const Preview = styled(motion.div)`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;

  div[data-rmiz-modal-overlay="visible"] {
    background-color: rgba(0, 0, 0, 0.5);
    filter: blur(1px);
    backdrop-filter: blur(1px);
  }
`;

export const ItensStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  button {
    border: 0;
    background: transparent;
    color: #c00;
    cursor: pointer;
  }
`;
