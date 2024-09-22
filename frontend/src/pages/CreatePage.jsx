import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useProductStore } from '../store/product'
import { Link } from 'react-router-dom'
const CreatePage = () => {
  const emptyObject = {
    name: '',
    price: '',
    image: '',
  }
  const [newProduct, setNewProduct] = useState(emptyObject)

  const toast = useToast()
  const { createProduct } = useProductStore()
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct)
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top-right',
      })
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top-right',
      })
    }

    setNewProduct(emptyObject)
  } 

  return (
    <Container maxW={'container.sm'} mt={100}>
      <VStack spacing={2}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={'full'}
          bg={useColorModeValue('white', 'grey.800')}
          p={6}
          rounded={'lg'}
          shadow={'md'}
        >
          <VStack spacing={4}>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={newProduct.name}
              onChange={(e) => {
                setNewProduct({ ...newProduct, name: e.target.value })
              }}
            />
            <Input
              type="number"
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) => {
                setNewProduct({ ...newProduct, price: e.target.value })
              }}
            />
            <Input
              type="text"
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => {
                setNewProduct({ ...newProduct, image: e.target.value })
              }}
            />
              <Button colorScheme="blue" onClick={handleAddProduct}>
                Add Product
              </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
export default CreatePage
