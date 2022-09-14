import styled from "styled-components";

export const Container = styled.ul`
  box-shadow: inset 0 0 5px #000;
  border-radius: 10px;
  margin-top: 20px;
  height: 300px;
  overflow: auto;
  scroll-behavior: smooth;

  li {
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
    outline: 0.5px solid rgba(68, 68, 68, 0.3);

    /* & + li {
      margin-top: 15px;
    } */
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 12px;
    border-radius: 12px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 12px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const FileInfoData = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 12px;
    color: #999;
    margin-top: 5px;

    button {
      border: 0;
      background: transparent;
      color: #e57878;
      margin-left: 5px;
      cursor: pointer;
    }
  }
`;

export const Preview = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`;

export const ItensStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
