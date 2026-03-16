const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

// Protect all following routes
router.use(authMiddleware);

router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/bulk-price', productController.bulkUpdatePrice);

module.exports = router;
