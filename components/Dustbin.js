import { useDrop } from "react-dnd";
import { Box } from "@chakra-ui/react";
import { ItemTypes } from "../components/ItemTypes.js";

function Dustbin({ children }) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,

    drop: () => ({ name: children?.key }),

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return (
    <div ref={drop} role={"Dustbin"}>
      <Box border={"1px"} borderColor={isActive ? "red" : "white"}>
        {children}
      </Box>
    </div>
  );
}

export default Dustbin;
