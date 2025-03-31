const Logger = require("../../utils/logger")

const ProductModel = require("../../models/Products")

const FilteredProducts = async (req, res) => {
    try {
        const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query

        let filters = {}

        if (category.length) {
            filters.category = { $in: category.split(',') }

        }
        if (brand.length) {
            filters.brand = { $in: brand.split(',') }

        }
        let sort = {}

        switch (sortBy) {

            case 'price-lowtohigh':
                sort.price = 1
                break
            case 'price-hightolow':
                sort.price = -1
                break
            case 'title-atoz':
                sort.title = 1
                break

            case 'title-ztoa':
                sort.title = -1
                break
            default:
                sort.price = 1
                break


        }

      
       
        const products = await ProductModel.find(filters).sort(sort)
        res.status(201).json({
            success: true,
            data: products
        })

    }
    catch (e) {
        Logger.error(e)
        res.status(500).json({
            success: false,
            message: e.stack
        })
    }
}

const getProductDetails = async(req,res)=>{
    try{
        const {id} = req.params
        const product = await ProductModel.findById(id)

        if(!product) return res.status(404).json({
            success : false,
            message : "Product not found",
            
        })
        res.status(201).json({
            success : true,
            data : product
        })
    }
    catch(e){
        Logger.error(e)
        res.status(500).json({
            success: false,
            message: e.stack
        })
    }
}

module.exports = { FilteredProducts , getProductDetails }