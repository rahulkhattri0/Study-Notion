import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { removeFromCart, resetCart } from '../../redux/slices/cartSlice';
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import IconBtn from '../common/IconBtn';
import { buyCourse } from '../../services/operations/payments';
import { useNavigate } from 'react-router-dom';

const CartTable = () => {
    const cart = useSelector((store)=>store.cart.cart)
    const cartPrice = useSelector((store)=>store.cart.totalCartPrice)
    const token = useSelector((store)=>store.auth.token)
    const user = useSelector((store)=>store.profile.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function handleCheckOut(){
        await buyCourse(token,cart,cartPrice,dispatch,navigate,user)
    }
  return (
    <div className='flex flex-col gap-y-4 justify-center m-4 text-center'>
        {
            cart.length === 0 ? (<p className='text-white text-xl font-bold'>No courses in Cart!</p>) : (
                <table className='border-2 border-richblack-400 w-full'>
                    <tbody>
                        <tr>
                            <td className='text-white text-center w-[60%]'>
                                Course
                            </td>
                            <td className='text-white text-center'>
                                Price
                            </td>
                            <td className='text-white text-center'>
                                Actions
                            </td>
                        </tr>
                        {
                            cart.map((course)=>{
                                return (
                                    <tr key={course._id} className='border-2 border-richblack-400'>
                                        <td className='p-2'>
                                            <div className='flex flex-row gap-x-4 items-center'>
                                                <img
                                                    src={course.thumbnail}
                                                    alt='course img'
                                                    className='object-cover w-[40%]'
                                                    loading='lazy'
                                                />
                                                <p className='text-xl font-bold text-richblack-5'>{course.courseName}</p>
                                            </div>
                                        </td>
                                        <td className='p-2 text-richblack-5'>
                                            <div className='flex flex-row gap-x-2 items-center justify-center'>
                                                <MdCurrencyRupee className='text-xl'/>
                                                {course.price}
                                             </div>
                                        </td>
                                        <td className='text-white '>
                                            <div className='flex justify-center'>
                                                <MdOutlineDelete className='text-2xl cursor-pointer hover:text-red-100 text-center hover:animate-pulse' onClick={()=>dispatch(removeFromCart(course))}/>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td></td>
                            <td className='text-center text-richblack-5 p-2'>
                                Total Price
                            </td>
                             <td className='text-yellow-50 p-2'>
                                <div className='items-center flex flex-row gap-x-2 justify-center'>
                                    <MdCurrencyRupee className='text-xl'/>
                                    { cartPrice }
                                </div>
                             </td>
                        </tr>
                    </tbody>
                </table>
            )
        }
        { cart.length > 0 && <div className='flex justify-end'>
            <IconBtn
                onClick={handleCheckOut}
                text={'Checkout'}
            >
                <MdOutlineShoppingCartCheckout/>
            </IconBtn>
        </div>}
    </div>
  )
}

export default CartTable