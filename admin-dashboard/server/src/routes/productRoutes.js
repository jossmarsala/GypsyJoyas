const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/bulk-price', productController.bulkUpdatePrice);

module.exports = router;
