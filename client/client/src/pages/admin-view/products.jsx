import { Button } from "@/components/ui/button";
import Form from "@/components/ui/common-components/form";
import { SheetContent, SheetHeader, SheetTitle,Sheet } from "@/components/ui/sheet";
import { ProductElements } from "@/config";
import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ImageUpload from "./image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/product-slice";
import { useToast } from "@/components/ui/use-toast";
import AdminProductTile from "./product-tile";
import { Item } from "@radix-ui/react-select";



export default function AdminProducts(){
   const dispatch = useDispatch()
   const {ProductList} = useSelector(state=>state.adminproducts)
    const [openProd,setOpenProd] = useState(false)
    const [image,setImage] = useState(null)
    const [imageUrl,setImageUrl] = useState("")
    const[imgload,setimgloading] = useState(false)
   const {toast}=useToast()
   const [curid , setcurid] = useState(null)




   const initialForm=  {
      image : null,
      title : "",
      description : "",
      category : "",
      brand : "",
      price : 0,
      salePrice : 0,
      totalStock : "",
      
  }
    const [form,setForm] = useState(initialForm)
    function isFormValid(){
      return Object.keys(form).map(key=>form[key]!=="" && form[key]!==0).every(item=>item)
    }
    function handleDelete(id){

      dispatch(deleteProduct({id})).then(d=>{console.log(d)
        dispatch(fetchAllProducts())
        setForm(initialForm)
        
      })

    }

    useEffect(()=>{
      dispatch(fetchAllProducts())
      
    },[dispatch])

    

    function OnSubmit(e){
      e.preventDefault()
     
     
      if(curid){

   dispatch(editProduct({id : curid,
    data : {...form,
      
      salePrice : form.salePrice===""?0:form.salePrice
    }
  })).then(d=>{
    if(d?.payload?.success){
      dispatch(fetchAllProducts())
      setOpenProd(false)
      setForm(initialForm)
      
      
    }
   })
      }
      else{
     
      dispatch(addProduct({
        ...form,
        image : imageUrl
      })).then((data)=>{

        if(data?.payload?.success){
          dispatch(fetchAllProducts())
          setOpenProd(false)
          setImage(null)
          setForm(initialForm)
          toast({
            title : data.payload.message,
            variant : "destructive"
          })

        }
      })
    
    }
      

    }
    return (
        <Fragment>
   <div className="mb-5 w-full flex justify-end">
    
    <Button className=" bg-slate-400" onClick={()=>setOpenProd(true)}>Add</Button></div>
    
    
    <div className="grid gap-4 md:grid-cols-3  text-fuchsia-500">
      {
        ProductList?.length > 0 ?  ProductList.map(i=><AdminProductTile setcurid = {setcurid} setForm={setForm} setOpenProd ={setOpenProd}product={i} handleDelete={handleDelete}/>): null
      }
    </div>
    <Sheet  open={openProd} onOpenChange={() => {setOpenProd(false) 
      setcurid(null)
      setForm(initialForm)
    }}>
  <SheetContent
    side="right"
    className="overflow-auto max-h-full p-6 relative rounded-lg  text-fuchsia-500 bg-black"
  >
    <SheetHeader>
      <SheetTitle>{curid? "Edit Product" : "Add new Product"}</SheetTitle>
    </SheetHeader>
    <ImageUpload  file={image} setImage={setImage} imageUrl={imageUrl} setImageUrl={setImageUrl} imgload={imgload} setimgloading = {setimgloading} curid={curid}/>
    <div className="py-6">
      <Form 
        registerFormControls={ProductElements}
        formData={form}
        setFormData={setForm}
        onSubmit={OnSubmit}
        isFormValid = {!isFormValid()}
      />
    </div>
  </SheetContent>
</Sheet>


        </Fragment>
        
    )
}