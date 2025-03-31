import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import ProductFilter from "./filter";
import { DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { buildFilters, FilteredProducts, singleProductDetails } from "@/store/shop-product";
import ShoppingProductTile from "./product-tile";
import { createSearchParams, useLocation, useOutletContext, useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "./product-details";
import { addToCart, getCart, UpdateCart } from "@/store/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import { fetchAllProducts } from "@/store/product-slice";

export default function Listing() {
    const { Product, isLoading, singleProduct, filterState ,query } = useSelector(state => state.shopSlice)
    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const [sort, setSort] = useState(null)
    const [filter, setFilters] = useState(filterState)
    const [searchParams, setSearchParams] = useSearchParams()
    const [open, setOpen] = useState(false)
    const {toast} = useToast()
    const {cartItems} = useSelector(state=>state.cartSlice)
    const {searchItems,keyword} = useSelector(state=>state.searchSlice)
  
   

   
    
   
    
    useEffect(()=>{
      setFilters(filterState)
    },[filterState])
    
    useEffect(() => {
       
        if (  sort !== null)
            dispatch(FilteredProducts({ filterParams: filter, sortParams: sort })).then(d => console.log(d)
            )
    }, [dispatch, sort, filter])

    

    useEffect(() => {
        setSort("price-lowtohigh")
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
    }, [])

    // function createSearchParamsHelper(filterparams) {
    //     const queryParam = []



    //     for (const [k, v] of Object.entries(filterparams)) {
    //         if (Array.isArray(v) && v.length > 0) {
    //             const paramValue = v.join(",")
    //             queryParam.push(`${k}=${encodeURIComponent(paramValue)}`)
    //         }
    //     }

    //     return queryParam.join("&")

    // }
    useEffect(() => {
        if(singleProduct!==null) setOpen(true)


    }, [singleProduct])
   
    
    function handleGetProductDetails(currentid) {
       
        dispatch(singleProductDetails({ id: currentid }))

    }

    function handleAddtoCart(id, totalStock){
    let currentItem = cartItems?.items?.filter(item=>item.productId === id)

        if(currentItem?.[0]?.quantity + 1  > totalStock){
                
                
                toast({
                    title : "Max limit reached",
                    variant : "destructive"
                })
                
            }
        
            else{
        
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
    })
}
        
    }

   

    useEffect(() => {


        if (filter && Object.keys(filter).length > 0) {
            dispatch( buildFilters(filter))
                
   
            
            
        }


    }, [filter])

    useEffect(()=>{

       if(keyword && query) setSearchParams(new URLSearchParams(`?search=${keyword}&$${query}`))
        else if(keyword)  setSearchParams(new URLSearchParams(`?search=${keyword}`))
        else  setSearchParams(new URLSearchParams(`?${query}`))
    },[query,keyword])

    function handleSort(val) {
        setSort(val)



    }
  


    // function handleFilter(getSectionId, getCurrentOption) {

    //     setSort(val);
    // }

    function handleFilter(getSectionId, getCurrentOption) {
        setFilters((prevFilters) => { 
            const cpyFilters = { ...prevFilters };
            if (!cpyFilters[getSectionId]) {
                cpyFilters[getSectionId] = [getCurrentOption];
            } else {
                const index = cpyFilters[getSectionId].indexOf(getCurrentOption);
                if (index === -1) {
                    cpyFilters[getSectionId].push(getCurrentOption);
                } else {
                    cpyFilters[getSectionId].splice(index, 1);
                }
            }

            // Log the filter state before saving to sessionStorage
            
            sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
            return cpyFilters;
        });


    }
    
    
    return (
        <div className="bg-slate-400 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filter={filter} handleFilter={handleFilter} />
            <div className="bg-background w-full rounded-lg shadow-md">
                <div className="p-4 border flex items-center justify-between ">
                    <h2 className="text-lg font-extrabold">All Products</h2>
                    <div className="flex items-center gap-4">

                        <span className="text-muted-foreground">{Product?.length} Products</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <ArrowUpDownIcon className="h-4 w-4" /> SortBy


                                </Button>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white w-[200px]">
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {
                                        sortOptions.map(sortitem =>
                                            <DropdownMenuRadioItem value={sortitem.id} key={sortitem.id}>
                                                {sortitem.label}
                                            </DropdownMenuRadioItem>
                                        )
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">

                    {
                       searchItems?.length>0 ? searchItems.map(item=>(<ShoppingProductTile product={item} handleGetProductDetails={handleGetProductDetails} handleAddtoCart={handleAddtoCart} />)) : Product ? Product?.map(product => <ShoppingProductTile product={product} handleGetProductDetails={handleGetProductDetails} handleAddtoCart={handleAddtoCart} />) : <h2>Loading...</h2>
                    }
                </div>
            </div>
            
            <ProductDetailsDialog open={open} setOpen={setOpen} product={singleProduct} handleAddtoCart={handleAddtoCart} />
           
        </div>
    )
}

