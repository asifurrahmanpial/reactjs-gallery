import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { ItemsContext, ItemsForDeleteContext } from '../context';
import { ImageType } from '../imageType';
import AddPhoto from './AddPhoto';
import Grid from './Grid';
import Header from './Header';
import Item from './Item';
import SortableItem from './SortableItem';

interface GalleryProps {
  image: ImageType[];
}

const Gallery: FC<GalleryProps> = ({ image }) => {
  const [items, setItems] = useState<ImageType[]>(image);
  const [activeItem, setActiveItem] = useState<ImageType | null>(null);
  const [itemsForDelete, setItemsForDelete] = useState<string[] | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setActiveItem(items.find((item) => item.id === event.active.id)!);
    },
    [items]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over?.id && active.id !== over?.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        setItems((items) => {
          return arrayMove(items, oldIndex, newIndex);
        });
      }

      setActiveItem(null);
    },
    [items]
  );

  const handleDragCancel = useCallback(() => {
    setActiveItem(null);
  }, []);

  return (
    <GalleryContainer>
      <ItemsContext.Provider value={{ items, setItems }}>
        <ItemsForDeleteContext.Provider
          value={{
            itemsForDelete,
            setItemsForDelete,
          }}
        >
          <Header />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={rectSortingStrategy}
            >
              <Grid>
                {items.map((item, index) => (
                  <SortableItem key={item.id} item={item} index={index} />
                ))}

                <AddPhoto />
              </Grid>
            </SortableContext>

            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
              {activeItem ? (
                <Item
                  style={{ background: '#fff' }}
                  item={activeItem}
                  isDragging
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </ItemsForDeleteContext.Provider>
      </ItemsContext.Provider>
    </GalleryContainer>
  );
};

export default Gallery;

const GalleryContainer = styled.div`
  user-select: none;
  background-color: #fff;
  border-radius: 10px;

  @media screen and (min-width: 576px) {
    margin: 30px;
  }
`;
