import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useProductStore } from '../store/product'

const ModalComponent = ({ isOpen, onClose, product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product)
  const { updateProduct } = useProductStore()
  const toast = useToast()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              value={updatedProduct.name}
              onChange={(e) => {
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }}
            />
            <Input
              type="number"
              placeholder="Price"
              name="price"
              value={updatedProduct.price}
              onChange={(e) => {
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }}
            />
            <Input
              type="text"
              placeholder="Image URL"
              name="image"
              value={updatedProduct.image}
              onChange={(e) => {
                setUpdatedProduct({ ...updatedProduct, image: e.target.value })
              }}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={async () => {
              const { success, message } = await updateProduct(
                product._id,
                updatedProduct
              )
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

              onClose()
            }}
          >
            Update
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default ModalComponent
