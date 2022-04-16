import { useDrag } from "react-dnd";

import { ItemTypes } from "../components/ItemTypes.js";

function DBox({ children, onChange }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { children },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onChange(children.key, dropResult.name);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div ref={drag} role="Box">
      {children}
    </div>
  );
}
export default DBox;
