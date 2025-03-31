import one from "../../assets/one.jpg"
import two from "../../assets/two.jpg"
import three from "../../assets/three.jpg"
import { Button } from "@/components/ui/button"
import { BabyIcon, BookText, BrainCog, ChevronLeft, ChevronRight, EqualNot, FootprintsIcon, MailOpenIcon, MountainIcon, Rabbit } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProducts } from "@/store/product-slice"
import ShoppingProductTile from "./product-tile"
import { singleProductDetails } from "@/store/shop-product"
import { addToCart, getCart } from "@/store/cart-slice"
import { getAdapter } from "axios"
import { useToast } from "@/components/ui/use-toast"
import ProductDetailsDialog from "./product-details"

export default function Home() {
  const slides = [one, two, three]
  const [curSlide, setCurSlide] = useState(0)
  const nav = useNavigate()
  const {ProductList} = useSelector(state=>state.adminproducts)
  const {user} = useSelector(state=>state.auth)
  const {singleProduct} = useSelector(state=>state.shopSlice)
  const [open, setOpen] = useState(false)
  const {toast}=useToast()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch])

  

  

  function handleNavigate(curItem , section){

    sessionStorage.removeItem('filters')
    const curFilter = {
      [section] : [curItem.id]
    }

    sessionStorage.setItem('filters',JSON.stringify(curFilter))
    nav("/shopping/listing")





  }
 
    function handleGetProductDetails(currentid) {
       
        dispatch(singleProductDetails({ id: currentid }))

    }
    function handleAddtoCart(id){
          
            dispatch(addToCart({
                userId : user?.userId,
                productId : id,
                quantity : 1
            })).then(d=>{
                if(d?.payload?.success){
                    dispatch(getCart({userId : user?.userId}))
                    toast({
                        title : "Product added to cart"
                    })
    
                }
        })}

  const CategoryOption = [
    {id : "men",label : 'Men', icon : MailOpenIcon},
    {id : "women",
      label : "Women", icon : BabyIcon},
      { id : 'kids',
        label : 'Kids', icon : BookText},
        { id : 'footwear',
          label : "Footwear", icon : FootprintsIcon}
  ]
  const BrandOptions = [{id : "puma",label : 'puma', icon : Rabbit},
    {id : "nike",
      label : "nike", icon : MountainIcon},
      { id : 'adidas',
        label : 'adidas', icon : EqualNot},
        { id : 'levi',
          label : "levi", icon : BrainCog}]
 
  
          useEffect(() => {
            if(singleProduct!==null) setOpen(true)
              
              
    
    
        }, [singleProduct])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurSlide(prev => (prev + 1) % slides.length)
    }, 5000);
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
        <div className=" w-full h-[600px] overflow-hidden">
        <div className="flex  duration-1000 ease-in-out" style={{transform : `translateX(-${curSlide*100}%)`,width: '100%',height:'600px'}}>{
            slides.map((s,i)=>
                  <div className="w-full flex-shrink-0" key={i}><img src={s}  className={`w-full h-full object-cover`}/></div>
                    
                )
                
            
            }
</div>
<Button  onClick= {()=>setCurSlide(prev=>(prev-1+slides.length) % slides.length)} variant="outline" size="icon" className=' absolute  top-1/2 left-4 transform -translate-y-1/2 bg-red-300'><ChevronLeft className=" w-4 h-4"/></Button>
        <Button  onClick= {()=>setCurSlide(prev=>(prev+1) % slides.length)} variant="outline" size="icon" className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-700'><ChevronRight className=" w-4 h-4"/></Button>
        </div>
        <span className="font-extrabold text-xl px-[760px] ">Categories</span>
        <div className=" p-10 mt-8 flex items-center justify-center w-full  gap-3">
          {
            CategoryOption.map(item=>(<div onClick={()=>handleNavigate(item,'category')} className="justify-items-center w-[350px]  h-[150px] p-10   border rounded-lg shadow-sm "><item.icon className="w-10 h-10 "/>
            <span>{item.label}</span>
            </div>))
          }
            
        </div>
        <div className="relative">
        <span className="absolute font-extrabold text-xl top-0 left-1/2 right-1/2">Brands</span>
        <div className="flex items-center justify-center h-[200px] gap-4 mt-3">
         
          {
            BrandOptions.map(item => (<div onClick={()=>handleNavigate(item,'brand')} className="justify-items-center  w-[350px] h-[150px]  p-10 border rounded-lg shadow-lg"> <item.icon className="w-10 h-10"/> <span>{item.label}</span> </div>))
          }
        </div>
        </div>
        <div>
          <span className="font-extrabold text-xl px-[670px]">Feature products</span>
          <div className="grid grid-cols-4 gap-4 items-center justify-center p-10">
            
              {
                ProductList?.length>0 ? ProductList.map(item=>
                <ShoppingProductTile product={item} handleGetProductDetails={handleGetProductDetails} handleAddtoCart={handleAddtoCart}/>) : null

              }
            

          </div>
        </div>
         <ProductDetailsDialog open={open} setOpen={setOpen} product={singleProduct} handleAddtoCart={handleAddtoCart} />
    </div>
  )
  
}

// {/* <div className="flex flex-col min-h-screen">
//       <div className="relative w-full h-[600px]">
//         {/* Wrapper for all images, which will slide together */}
//         <div className="flex  duration-1000 ease-in-out" style={{ transform: `translateX(-${curSlide * 100}%)`, width: '100%' , height: '600px' }}>
          
//           {/* Individual image containers */}
//           {slides.map((slide, index) => (
//             <div className="w-full flex-shrink-0" key={index}>
//               <img
//                 src={slide}
//                 alt={`Slide ${index + 1}`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Left button */}
//         <Button onClick={() => setCurSlide(prev => (prev - 1 + slides.length) % slides.length)} variant="outline" size="icon"
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-pink-300">
//           <ChevronLeft className="w-4 h-4" />
//         </Button>

//         {/* Right button */}
//         <Button onClick={() => setCurSlide(prev => (prev + 1) % slides.length)} variant="outline" size="icon"
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-pink-300">
//           <ChevronRight className="w-4 h-4" />
//         </Button>
//       </div>
//     </div> */}