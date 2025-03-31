const ProductModel = require("../../models/Products")
const SearchQuery = async(req,res)=>{
    try{
        
        
     const {q} = req.query
     if(!q && typeof q!== "string"){
        return res.status(404).json({
        success : false,
        message: "keyword is not well-formed"
        })
     }

     

     const regExp = new RegExp(q,'i')
     
     
    const createQuery= {
        $or : [{title :  regExp},{description : regExp},{category:regExp}]
    }

    const searchItem = await ProductModel.find(createQuery)
    res.status(201).json({
        success : false,
        searchItem 
    })

    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false,
            message : e
        })
        
    }

}

module.exports = SearchQuery