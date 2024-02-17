import React from 'react';
import { MdCurrencyRupee, MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buyCourse } from '../../services/operations/payments';
import IconBtn from '../common/IconBtn';
import Table from '../common/Table';
import CartTableRow from './CartTableRow';

const CartTable = () => {
  const cart = useSelector((store) => store.cart.cart);
  const cartPrice = useSelector((store) => store.cart.totalCartPrice);
  const token = useSelector((store) => store.auth.token);
  const user = useSelector((store) => store.profile.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleCheckOut() {
    await buyCourse(token, cart, cartPrice, dispatch, navigate, user);
  }
  return (
    <div className="flex flex-col gap-y-4 justify-center m-4 text-center">
      <Table columns={'grid-cols-[3fr_1fr_1fr]'}>
        <Table.Header>
          <div className="text-center">Course</div>
          <div className="text-center">Price</div>
          <div className="text-center">Actions</div>
        </Table.Header>
        <Table.Body
          data={cart}
          render={(cartItem) => <CartTableRow key={cartItem._id} course={cartItem} />}
        />
        {cart.length > 0 && (
          <Table.Row>
            <div></div>
            <div className="text-center text-richblack-5 p-2">Total Price</div>
            <div className="text-yellow-50 p-2">
              <div className="items-center flex flex-row gap-x-2 justify-center">
                <MdCurrencyRupee className="text-xl" />
                {cartPrice}
              </div>
            </div>
          </Table.Row>
        )}
      </Table>
      {cart.length > 0 && (
        <div className="flex justify-end">
          <IconBtn onClick={handleCheckOut} text={'Checkout'}>
            <MdOutlineShoppingCartCheckout />
          </IconBtn>
        </div>
      )}
    </div>
  );
};

export default CartTable;
