import { Flex, Text, Divider} from "@chakra-ui/react";
import { InfoOutlineIcon } from '@chakra-ui/icons'

export default function Footer() {
  return (
    <Flex
    justify="center"
    gap={1}
    w="100%"
    align="center"
    mb='40px'
    >
      <Flex
      bg="rgba(256,256,256,0.6)"
      maxW="120vh"
      w="90%"
      borderRadius="8px"
      height="auto"
      flexDir="column"
      >
        <Flex>
            <Text
            color="black"
            fontSize="14.5px"
            pl={3.5}
            pb="2px"
            pt="5px"
            >Disclaimer</Text>

            <InfoOutlineIcon
            mt="7.5px"
            ml={1.5}
            />
        </Flex>

        <Divider
            borderColor="black"
        />

        <Flex
        p={1}
        >
            <Text
            color="black"
            fontSize="12px"
            pl="10px"
            pt="1px"
            pb="4px"
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo incididunt ut labore 
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco!
            </Text>
        </Flex>

      </Flex>
    </Flex>
  );
}
