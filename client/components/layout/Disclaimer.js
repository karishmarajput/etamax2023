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
            ><span style={{ fontWeight: 'bold' }}>Criteria for FCRIT Students</span>: 1 cultural , 1 technical and only 1 Department seminar.
            <br /><span style={{ fontWeight: 'bold' }}>Steps to register</span>
            <br />1. For FCRIT students you will recieve your credentials via mail directly.
            But for non-FCRIT students you have to register on our website and once the team approves you then only you will get your credentials via registered mail-id.

            <br />2. After login you can register for different events in the event's section.

            <br />3. Once you have choosen your event and registered for the events, then you need to go to the checkout page and confirm your registration.

            <br />4. Your slots will be confirmed only If you have completed the payment to any of the council's desk.
            Untill then your slot is unconfirmed and some other participant can take it.

            Slots will be confirmed on <span style={{ fontWeight: 'bold' }}>FIRST COME FIRST SERVE</span> basis.
            </Text>
        </Flex>

      </Flex>
    </Flex>
  );
}
