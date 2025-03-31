import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function AdminProductTile({product,setcurid,setForm,setOpenProd,handleDelete}){
    
    
    return (
        <Card className="w-full max-w-sm mx-auto">
        <div>
        <div className="relative">
        <img src={product?.image} alt={product?.title} className="w-20 h-20 object-cover rounded-t-lg"/>
        </div>

        <CardContent >
        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
       
        <div className="flex justify-between items-center mb-2">
        <span className={product.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary >{product?.price}</span>
        <span className="text-lg font-semibold">{product?.salePrice>0?product.salePrice : null}</span>
        </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <Button onClick={()=>{setOpenProd(true)
                setcurid(product?._id)
                setForm({
                    title : product.title,
                    image : product.image,
                    description : product.description,
                    price : product.price,
                    salePrice : product.salePrice,
                    totalStock : product.totalStock,
                    brand : product.brand,
                    category : product.category
                })
            }}>Edit</Button>
            <Button onClick={()=>handleDelete(product._id)}>Delete</Button>

        </CardFooter>
        
        </div>
        </Card>
    )
}