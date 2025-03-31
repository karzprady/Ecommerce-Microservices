import { SearchIcon } from "lucide-react";
import { Input } from "../input";
import { Label } from "../label";
import { useDispatch, useSelector } from "react-redux";
import { getSearchItems, resetSearchItems, setKeyword } from "@/store/search";
import ShoppingProductTile from "@/pages/shopping-view/product-tile";
import { useLocation, useSearchParams } from "react-router-dom";
import { setQuery } from "@/store/shop-product";

export default function Search(){
    const dispatch = useDispatch()
    const loc = useLocation()
    const [search,setSearch] = useSearchParams()
    const {query} = useSelector(state=>state.shopSlice)
   
   
    function handleChange(e){
        if(e.target.value==="") {dispatch(resetSearchItems());
            setSearch("")
            dispatch(setKeyword(""))
        }
        else{
        dispatch(getSearchItems({keyword : e.target.value, filters : JSON.parse(sessionStorage.getItem('filters'))}))
        dispatch(setKeyword(e.target.value))
        setSearch(new URLSearchParams(`?search=${e.target.value}&${query}`))
        }
        
    }

    if(!loc.pathname.includes("listing")) return
    return <div className="flex flex-row gap-2 align-middle  items-center rounded-xl shadow-lg shadow-orange-400">
        <Label><SearchIcon/></Label>
        <Input type="text" placeholder="Search the products" name="search" onChange={handleChange}  className="w-30 text-red-400 font-semibold" />
    </div>
}