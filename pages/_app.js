import "../styles/globals.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
    </ChakraProvider>
  );
}

export default MyApp;
