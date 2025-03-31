import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { filterOptions } from "@/config";
import { Fragment } from "react";
import { useOutletContext } from "react-router-dom";

export default function ProductFilter({filter,handleFilter}){
    




return(
    <div className="bg-background rounded-lg shadow-sm border">
        <div className="p-4 border-b">
            <h2 className="text-lg font-extrabold">Filters</h2>

        </div>
        <div className="p-4 space-y-4">
            {
                Object.keys(filterOptions).map(key=>
                    <Fragment>
                        <div>
                            <h3 className="text-base font-bold">{key}</h3>
                            <div className="grid gap-2 mt-2">
                              {
                                filterOptions[key].map(option=><Label className="flex font-medium items-center gap-2">
                                    <Checkbox checked={
                                       filter?  filter[key]?.includes(option.id) 
                                   : null } onCheckedChange={()=>handleFilter(key,option.id)}/> 
                                    {option.label}
                                    
                                </Label>)
                              }
                            </div>
                        </div>
                        <Separator/>
                    </Fragment>
                )
            }

        </div>
    </div>
)

}