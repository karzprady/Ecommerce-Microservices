import { Label } from "../label";
import { Input } from "../input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Textarea } from "../textarea";
import { Button } from "../button";

export default function Form({ registerFormControls,show=true, formData, setFormData, onSubmit="" , isFormValid , ButtonText="Submit" ,styling}) {
   
    

    function renderInput(item) {
        let element = null;
        const value = formData[item.name];
        
        
        
    
        switch (item.componentType) {
            case 'input':
                element = (
                    <Input
                        name={item.name}
                        type={item.type}
                        placeholder={item.placeholder}
                        value={value || ''}
                        onChange={(e) => setFormData({ ...formData, [item.name]: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                );
                break;
    
            case 'select':
                element = (
                    <Select
                    onValueChange={(value) => {
                       
                        setFormData((prevFormData) => ({ ...prevFormData, [item.name]: value }));
                    }}
                    value={value !== undefined ? value : ''}

                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md">
                        <SelectValue placeholder={item.placeholder} />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {item.options && item.options.map((i) => {
    // Log the option structure
    return (
        <SelectItem key={i.id} value={i.label} className="rounded-md">
            {i.label}
        </SelectItem>
    );
})}

                    </SelectContent>
                </Select>
                );
                break;
    
            case 'textarea':
                element = (
                    <Textarea
                        name={item.name}
                        placeholder={item.placeholder}
                        value={value || ''}
                        onChange={(e) => setFormData({ ...formData, [item.name]: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                );
                break;
    
            default:
                break;
        }
        return element;
    }
    
    return (
        <form onSubmit={(e) => onSubmit(e)} className={  `space-y-4 bg-amber-200`}>
            <div className={ styling ? styling : `flex-col gap-3`}>
                {registerFormControls.map(i => (
                    <div className="grid w-full gap-2" key={i.name}>
                        <Label className="m-1">{i.label}</Label>
                        {renderInput(i)}
                    </div>
                ))}
            </div>
          {show?   <Button disabled={isFormValid} className="m-2 p-2 border rounded-md  bg-slate-400"   type="submit" >{ButtonText}</Button>:<div className="h-10"></div>}
        </form>
    );
}
