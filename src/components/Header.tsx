import { useContext } from "react";
import styled from "styled-components";
import { ItemsContext, ItemsForDeleteContext } from "../context";

const Header = () => {
  const { setItems } = useContext(ItemsContext);
  const { itemsForDelete, setItemsForDelete } = useContext(
    ItemsForDeleteContext
  );

  const handleDelete = () => {
    itemsForDelete?.map((id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    });

    setItemsForDelete(null);
  };

  const handleChange = () => {
    setItemsForDelete(null);
  };

  return (
    <HeaderContainer>
      {itemsForDelete?.length ? (
        <InputBox>
          <input
            name="checkbox"
            type="checkbox"
            checked={itemsForDelete?.length ? true : false}
            onChange={handleChange}
          />
          <Title>
            <span>{itemsForDelete?.length}</span> <span>Files Selected</span>
          </Title>
        </InputBox>
      ) : (
        <Title>Gallery</Title>
      )}

      {itemsForDelete?.length ? (
        <DeleteButton onClick={handleDelete}>Delete files</DeleteButton>
      ) : null}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  input {
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.h1`
  font-size: 20px;
`;

const DeleteButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: red;
  font-size: 16px;
  cursor: pointer;
  padding: 7px 14px;
  border-radius: 5px;

  &:hover {
    background-color: #ff00002d;
  }
`;
