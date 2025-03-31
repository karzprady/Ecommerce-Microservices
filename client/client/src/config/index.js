

export const RegisterFormControls=[
    {
        label: "Username",
        name: "username",
        type: "text",
        placeholder: "Enter your username",
        componentType:"input"
    },
    {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "Enter your email",
        componentType:"input"
    },
    {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        componentType:"input"
    },

]
export const LoginFormControls=[
    {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "Enter your email",
        componentType:"input"
    },
    {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        componentType:"input"
    },

]

 export const ProductElements = 
    [
       
            {
              "label": "title",
              "name": "title",
              "type": "text",
              "componentType": "input",
              "placeholder": "Enter product name"
            },
            {
              "label": "description",
              "name": "description",
              "type": "text",
              "componentType": "textarea",
              "placeholder": "Enter description "
            },
            {
              "label": "category",
              "name": "category",
              "type": "text",
              "componentType": "input",
              "placeholder": "Enter category "
            },
            {
              "label": "brand",
              "name": "brand",
              "type": "text",
              "componentType": "input",
              "placeholder": "Enter brand"
            },
            {
              "label": "price",
              "name": "price",
              "type": "number",
              "componentType": "input",
              "placeholder": "Enter price"
            },
          
            {
              "label": "salePrice",
              "name": "salePrice",
              "type": "number",
              "componentType": "input",
              "placeholder": "Enter salePrice "
            },
            {
              "label": "totalStock",
              "name": "totalStock",
              "type": "number",
              "componentType": "input",
              "placeholder": "Enter totalStock"
            },
            
      ]
      
export const shoppingViewHeaderMenuItems = [{
  id : "Top items",
  label : 'Top items',
  path : "/shopping/home" 

},{
  id : "Home",
  label : 'Home',
  path : "/shopping/listing" 

},{
  id : "men",
  label : 'Men',
  path : "/shopping/listing" 

},{
  id : "women",
  label : "Women",
  path : "/shopping/listing"

},{
  id : 'kids',
  label : 'Kids',
  path : "/shopping/listing"

},{
  id : 'footwear',
  label : "Footwear",
  path :  "/shopping/listing"

}]

export const filterOptions = {
  category:[
    {id : "men",label : 'Men'},
    {id : "women",
      label : "Women",},
      { id : 'kids',
        label : 'Kids',},
        { id : 'footwear',
          label : "Footwear",}
  ],
  brand : [{id : "puma",label : 'puma'},
    {id : "nike",
      label : "nike",},
      { id : 'adidas',
        label : 'adidas',},
        { id : 'levi',
          label : "levi",}]
}

export const sortOptions = 
  [{id : "price-lowtohigh",label : 'Price: low to high'},
    {id : "price-hightolow",
      label : "Price: high to low",},
      { id : 'title-atoz',
        label : 'Title: A to Z',},
        { id : 'title-ztoa',
          label : "Title: Z to A",}]

  export const AddressFormControls = [
            {
              label: "Address",
              name: "address",
              type: "text",
              placeholder: "Enter your address",
              componentType: "textarea",
            },
            {
              label: "City",
              name: "city",
              type: "text",
              placeholder: "Enter your city",
              componentType: "input",
            },
            {
              label: "Pincode",
              name: "pincode",
              type: "text",
              placeholder: "Enter your pincode",
              componentType: "input",
            },
            {
              label: "Phone",
              name: "phone",
              type: "text",
              placeholder: "Enter your phone number",
              componentType: "input",
            },
            {
              label: "Notes",
              name: "notes",
              type: "text",
              placeholder: "Enter additional notes",
              componentType: "input",
            },
          ];
          
export const OrderStatus =[{
  label: "status",
  name: "status",
  placeholder: "select status",
  componentType: "select",
  options : [
    {id: "inprocess" , label:"inprocess"},
    {id:"rejected" , label: "rejected"},
    {id:"delivered" , label:"delivered"},
    {id:"inshipping" , label:"inshipping"},
    {id:"pending" , label:"pending"}
  ]
}]



export const FiltersForOrders = [{
  label : "date",
  name : "date",
  placeholder : "Sort by Date",
  componentType : "select",
  options : [
    {id: 1 , label:"asc"},
    {id: -1 , label: "desc"},
    
  ]
},
{
  label : "price",
  name : "price",
  placeholder : "Sort by Price",
  componentType : "select",
  options : [
    {id: 1 , label:"lowtohigh"},
    {id: -1 , label: "hightolow"},
    
  ]
},
{
  label : "status",
  name : "status",
  placeholder : "Sort by status",
  componentType : "select",
  options : [
    {id: "pending" , label:"pending"},
    {id: "completed", label: "completed"},
    
  ]
},

]