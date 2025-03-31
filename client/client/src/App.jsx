import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/ui/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/ui/admin/admin-layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeatures from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import ShoppingHeader from './components/ui/shopping/header'
import ShoppingLayout from './components/ui/shopping/layout'
import NotFound from './pages/404/notfound'
import Home from './pages/shopping-view/home'
import Listing from './pages/shopping-view/listing'
import Checkout from './pages/shopping-view/checkout'
import Account from './pages/shopping-view/account'
import CheckAuth from './components/ui/common-components/checkAuth'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from './components/ui/skeleton'
import PaypalReturn from './pages/shopping-view/paypal-return'
import PaymentSuccess from './pages/shopping-view/payment-success'

function App() {

 const {isAuthenticated,user,isLoading} = useSelector(state => state.auth)
 const dispatch = useDispatch()


 useEffect(()=>{setTimeout(() => { dispatch(checkAuth())
  
 }, 2000);
 
 },[dispatch])

 if(isLoading) return <Skeleton className="w-[800px] h-[300px] bg-red-500" />

 

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      
      <Routes>
        <Route path = "/" element= {<CheckAuth><AuthLogin/></CheckAuth>}></Route>
        <Route path="/auth" element={ <CheckAuth isAuthenticated={isAuthenticated} user={user}> <AuthLayout /></CheckAuth>}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          
        </Route>
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="features" element={<AdminFeatures />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>
          <Route path="/shopping" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></CheckAuth>}>
            <Route path="home" element={<Home/>}/>
            <Route path="listing" element={<Listing/>}/>
            <Route path="checkout" element={<Checkout/>}/>
            <Route path="account" element={<Account/>}/>
            <Route path="paypal-return" element={<PaypalReturn/>}/>
            <Route path="paypal-success" element={<PaymentSuccess/>}/>
          </Route>
          <Route path="/check" element={<CheckAuth/>}/>
          <Route path='/*'element={<NotFound/>}/>
      </Routes>
    </div>

  )
}

export default App
