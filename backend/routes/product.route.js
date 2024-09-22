import { Router } from 'express'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js'

const router = Router()

// router.get('/', getProducts)
// router.post('/', createProduct)
// router.put('/:id', updateProduct)
// router.delete('/:id', deleteProduct)

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').put(updateProduct).delete(deleteProduct)


export default router
