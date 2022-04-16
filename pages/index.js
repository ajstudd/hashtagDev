import React, { useRef } from "react";
import DBox from "../components/DBox.js";
import Dustbin from "../components/Dustbin.js";
import {
  Box,
  Text,
  VStack,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Image,
  InputLeftElement,
  HStack,
} from "@chakra-ui/react";
import { FiUploadCloud } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";

export default function Home() {
  const [images, setImages] = React.useState([]);
  const inputFileRef = useRef();

  const [display, setDisplay] = React.useState(null);

  const handleClick = (img) => {
    setDisplay(img);
  };
  const handleDelete = (idx) => {
    const newImages = images.filter((img, i) => i !== idx);

    setImages(newImages);
    setDisplay(null);
  };

  const newpromise = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  let empty = [];
  const handleUpload = async () => {
    const files = inputFileRef.current.files;
    if (files.length > 0) {
      for (let file of files) {
        const result = await newpromise(file);
        empty.push(result);
      }
      setImages(images.concat(empty));
    }
  };

  return (
    <>
      <VStack>
        <Box w="50%" p="4">
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<FiUploadCloud color="gray.300" />}
            />
            <Input pr="4.5rem" rounded={"full"} />
            <InputRightElement w="120px">
              <Button
                onClick={() => {
                  inputFileRef.current.click();
                }}
                id="button"
                rounded={"full"}
                w="100px"
                bg="black"
                color={"white"}
              >
                Browse
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <input
          onChange={handleUpload}
          ref={inputFileRef}
          type="file"
          multiple="multiple"
          accept="image/png, image/jpeg"
          hidden
        />
        <Button
          id="button"
          rounded={"full"}
          width="200px"
          bg="black"
          color={"white"}
        >
          Upload
        </Button>

        <HStack spacing={"40px"}>
          {images.map((image, idx) => (
            <Dustbin>
              <DBox
                key={idx}
                onChange={(a, b) => {
                  const newImages = [...images];
                  const temp = newImages[a];
                  newImages[a] = newImages[b];
                  newImages[b] = temp;
                  setImages(newImages);
                }}
              >
                <Box
                  key={idx}
                  border={"1px"}
                  w="150px"
                  h="150px"
                  position={"relative"}
                >
                  <Box
                    onClick={() => {
                      handleDelete(idx);
                    }}
                    position={"absolute"}
                    top="2"
                    _hover={{
                      cursor: "pointer",
                    }}
                    right={"2"}
                    bg="white"
                    rounded="full"
                  >
                    <TiDeleteOutline fontSize={"1.5rem"} />
                  </Box>
                  <Image
                    onClick={() => {
                      handleClick(image);
                    }}
                    objectFit={"cover"}
                    h="150px"
                    w="150px"
                    alt="image"
                    src={image}
                  />
                </Box>
              </DBox>
            </Dustbin>
          ))}
        </HStack>
        <Box>
          {display && (
            <Box p="4" w="700px" h="600px">
              <Image alt="image" src={display} />
            </Box>
          )}
        </Box>
      </VStack>
    </>
  );
}
