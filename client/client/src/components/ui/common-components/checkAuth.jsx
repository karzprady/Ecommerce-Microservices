import { useLocation, Navigate }from "react-router-dom";

export default function CheckAuth({isAuthenticated, user,children}){
    const location = useLocation();

    if(location.pathname==="/" && !isAuthenticated){
        return <Navigate to ="/auth/login"/>
    }
    else if(location.pathname==="/" && isAuthenticated) {

    if(user?.role==="admin"){
        return <Navigate to="/admin/dashboard"/>
    }
    return    <Navigate to="/shopping/home"/>
}
    

    
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
    if(isAuthenticated && user?.role==='user' && location.pathname.includes("/paypal-return") && !sessionStorage.getItem('currentorderid') ){
        return <Navigate to="/shopping/home"/>         
    }

    
    return (
        <>{children}</>
    )
}