const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

const APIFeatures = require('../utils/apiFeatures');

// CREATE NEW PRODUCT => /api/v1/admin/product/new

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    
    const product = await Product.create(req.body);
    
    res.status(201).json({
        success: true,
        data:product
    })
})


// GET ALL PRODUCTS =>/api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)
    
    const products = await apiFeatures.query;
    // const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        productCount:productCount,
        data: products,
    })
})

// Get single product details => /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        // return res.status(404).json({
        //     success: false,
        //     message:'Product not found'
        // })

        return next(new ErrorHandler('Product not found', 404))
    }

    res.status(200).json({
        success: true,
        data: product
    })
})

//Update Product => /api/v1/admin/product/:id

exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
       return next(new ErrorHandler('Product not found', 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true,
        data:product
    })
})

//Delete Product => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product is deleted.",
    })
})