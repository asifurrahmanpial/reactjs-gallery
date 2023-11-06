import { createContext } from 'react';
import { ImageType } from '../imageType';

export interface ItemsContextProps {
  items: ImageType[];
  setItems: React.Dispatch<React.SetStateAction<ImageType[]>>;
}

export const ItemsContext = createContext<ItemsContextProps>({
  items: [],
  setItems: () => {},
});

export interface ItemsForDeleteContextProps {
  itemsForDelete: string[] | null;
  setItemsForDelete: React.Dispatch<React.SetStateAction<string[] | null>>;
}

export const ItemsForDeleteContext = createContext<ItemsForDeleteContextProps>({
  itemsForDelete: [],
  setItemsForDelete: () => {},
});
