import { useLocation, Navigate }from "react-router-dom";

export default function CheckAuth({isAuthenticated, user,children}){
  
    
    const location = useLocation();
   
   
    
   
    if(!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))){
        return <Navigate to="/auth/login"/>
    }

    if(isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))){
        if(user?.role==='admin'){
            return <Navigate to="/admin/dashboard"/>
        }
        return <Navigate to="/shopping/home"/>
    }
    if(isAuthenticated && user?.role!=='admin' && location.pathname.includes('/admin')){
       
        return <Navigate to="/noauth-page"/>
    }
    if(isAuthenticated && user?.role!=='user' && location.pathname.includes('/shopping')){
        return <Navigate to="/admin/dashboard"/>
    }
    

    
    return (
        
        
        <>{children}</>
    )
}