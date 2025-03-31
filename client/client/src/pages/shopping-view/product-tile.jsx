import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import StarComponent from "./starComponent";

export default function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {



    return <Card className="w-full max-w-sm mx-auto">
        <div onClick={() => handleGetProductDetails(product._id)} className={product.totalStock ==0 ? `bg-opacity-1 bg-amber-100` : ``}>
            <div className="relative">
                <img src={product?.image} alt={product?.title} className="w-dull h-[300px] object-cover rounded-t-lg" />
               

                {
                    product?.totalStock === 0 ? <Badge className="absolute top-2 right-2 bg-amber-600">Out of stock</Badge> : product?.totalStock < 10 ? <Badge className="absolute top-2 right-1 bg-green-400">Only {product.totalStock} items left</Badge> : null 
                }
                {
                    product?.salePrice > 0 ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-700">Sale</Badge> : null
                }

            </div>
            <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                <p>product Overall rating <StarComponent rating={Math.ceil(product?.averageReview)} disabled={true}/></p>
                <div className="flex flex-1 justify-between items-center  mb-2">
                    <span className=" border border-red-500 rounded-lg text-xs font-extrabold bg-indigo-300 p-2">{product?.category}</span>
                    <span className=" border border-green-500 rounded-lg text-xs font-extrabold bg-amber-200 p-2">{product?.brand}</span>
                </div>
                <div className={`flex justify-center items-center mb-2 `}  >
                    <span className={`${product?.salePrice > 0 ? "line-through" : ""}`}>${product?.price}</span>
                    {product?.salePrice > 0 ? <span >${product?.salePrice}</span> : null}

                </div>
            </CardContent>

        </div>
        <CardFooter>
            <Button disabled={product.totalStock ===0 ? true : false} onClick={() => handleAddtoCart(product?._id,product?.totalStock)} className="w-full bg-fuchsia-400">Add to Cart</Button>
        </CardFooter>

    </Card>
}