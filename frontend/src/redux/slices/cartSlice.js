import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";




const initialState = {
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    totalCartPrice : localStorage.getItem("totalCartPrice") ? JSON.parse(localStorage.getItem("totalCartPrice")) : 0
}


const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers : {
        addToCart : (state,action) =>{
            const course = action.payload
            const courseIdx = state.cart.findIndex((item)=> item._id === course._id)
            if(courseIdx>=0){
                toast.error("Course already in the cart")
                return
            }
            state.cart.push(course)
            state.totalItems++;
            state.totalCartPrice += course.price

            //now set in local storage
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
            localStorage.setItem("totalCartPrice",JSON.stringify(state.totalCartPrice))

            toast.success("course added to cart")
        },
        removeFromCart : (state,action) => {
            const course = action.payload
            const courseIdx = state.cart.findIndex((item)=>item._id === course._id)
            const coursePrice = state.cart[courseIdx].price
            state.cart.splice(courseIdx,1)
            state.totalItems--;
            state.totalCartPrice -= coursePrice

            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
            localStorage.setItem("totalCartPrice",JSON.stringify(state.totalCartPrice))

            toast.success("element removed from cart")
        },
        resetCart : (state) => {
            //basically reset in state and local storage as well
            state.cart = []
            state.totalCartPrice = 0
            state.totalItems = 0

            localStorage.removeItem("cart")
            localStorage.removeItem("totalItems")
            localStorage.removeItem("totalCartPrice")
        }
    }
})

export const {setToken} = cartSlice.actions 
export default cartSlice.reducer