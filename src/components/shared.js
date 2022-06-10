import styled from "styled-components";

export const BaseBox = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const CoffeeShopForm = styled.div`
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    border: 2px solid ${(props) => props.theme.fontColor};
    padding: 30px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    input {
      &:not(:first-child) {
        margin-top: 20px;
      }
      border-color: ${(props) => props.theme.bgReverse};
    }
  }
`;

export const shopBtn = styled.div`
  cursor: pointer;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 800;
  border-radius: 8px;
  width: 150px;
  height: 35px;
  color: white;
  transition: 0.2s;
  &:hover {
    opacity: 0.6;
  }
`;
