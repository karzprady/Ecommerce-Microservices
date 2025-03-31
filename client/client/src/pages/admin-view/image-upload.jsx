import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { DropletOff, FileIcon, LoaderPinwheelIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ImageUpload({file,setImage,imageUrl, setImageUrl,imgload,setimgloading,curid}){
    useEffect(()=>{
        if(file!==null) uploadToCloudinary()
    },[file])
    const inputRef = useRef()
    function handleImageFileChange(e){
       
        const UploadedFile = e.target.files[0]
        if(UploadedFile){
            setImage(UploadedFile)
        }
        

    }

    function handleDragOver(e){
        e.preventDefault()


    }

    function handleDrop(e){
        e.preventDefault()
        const droppedFile = e.dataTransfer.files[0]
        if(droppedFile){
            setImage(droppedFile)
        }
    }

    function handleRemoveImage(){
        setImage(null)
        if(inputRef.current){
            inputRef.current.value=''

        }
    }
    async function uploadToCloudinary() {
        setimgloading(true)
        const data  = new FormData()
        data.append('file', file)
        const res = await axios.post("http://localhost:3000/api/admin/products/upload-image",data)
    
        
        if(res){
        
            setImageUrl(res.data.result.url)
            setimgloading(false)
        }
        
    }
     if(imgload){
        return <Skeleton className= "h-40 bg-red-400"/>
    }
    
    return(
        <div className="w-full max-w-md mx-auto">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div onDragOver ={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg mt-4">
                <Input id="image-upload" type="file" className="" ref={inputRef} onChange={handleImageFileChange} disabled={curid?true : false} />

                {
                    !file? <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer
                    ">
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                        <span>Drag and drop or click to Upload image</span>
                    </Label> : <div className="flex flex-col items-center justify-center">
                    
                        <div className="flex flex-1 items-center justify-between "><p>{file.name}</p> <Button variant="ghost" size="icon" className="text muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                            <XIcon className="w-4 h-4"/>
                            <span className="sr-only">Remove File</span>
                        </Button></div>
                        {imageUrl? <img  src={`${imageUrl}`}/> : null}
                    </div>
                }
            </div>

        </div>
    )
}