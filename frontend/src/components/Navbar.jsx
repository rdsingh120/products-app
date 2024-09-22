import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { IoCreateOutline } from 'react-icons/io5'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Container maxW={'1140px'} px={'4'}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{
          base: 'row',
        }}
      >
        <Text
          fontSize={{ base: '22', sm: '28' }}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          textAlign={'center'}
          bgGradient={'linear(to-r, cyan.400, blue.500)'}
          bgClip={'text'}
        >
          <Link to={'/'}>Products App 🛒</Link>
        </Text>
        <HStack spacing={'2'} align={'center'}>
          <Link to={'/create'}>
            <Button>
              <IoCreateOutline size={20} />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode == 'dark' ? (
              <MdOutlineLightMode size={20} />
            ) : (
              <MdOutlineDarkMode size={20} />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}
export default Navbar
