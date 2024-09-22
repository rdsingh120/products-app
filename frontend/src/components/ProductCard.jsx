import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useToast,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { LuFileEdit } from 'react-icons/lu'
import { MdDelete } from 'react-icons/md'
import { useProductStore } from '../store/product'
import ModalComponent from './ModalComponent'

const ProductCard = ({ _id, name, price, image }) => {
  const textColor = useColorModeValue('grey.600', 'grey.200')
  const bg = useColorModeValue('white', 'gray.800')

  const toast = useToast()
  const { deleteProduct } = useProductStore()
  const handleDeleteProduct = async () => {
    const { message } = await deleteProduct(_id)
    toast({
      title: 'Success',
      description: message,
      status: 'success',
      isClosable: true,
      duration: 3000,
      position: 'top-right',
    })
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image src={image} alt={name} h={48} w={'full'} objectFit={'cover'} />
      <Box p={4}>
        <Heading as={'h3'} size={'md'} mb={2}>
          {name}
        </Heading>
        <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
          ${price}
        </Text>
        <HStack>
          <IconButton
            icon={<LuFileEdit size={20} />}
            colorScheme="blue"
            onClick={onOpen}
          />
          <IconButton
            icon={<MdDelete size={20} />}
            colorScheme="red"
            onClick={handleDeleteProduct}
          />
        </HStack>
      </Box>
      <ModalComponent isOpen={isOpen} onClose={onClose} product={{_id, name, price, image}} />
    </Box>
  )
}
export default ProductCard
