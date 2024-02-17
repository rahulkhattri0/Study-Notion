import React from 'react';
import Table from '../common/Table';
import { MdCurrencyRupee, MdOutlineDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/slices/cartSlice';

const CartTableRow = ({ course }) => {
  const dispatch = useDispatch();
  return (
    <Table.Row>
      <div className="flex flex-row gap-x-4 items-center">
        <img
          src={course.thumbnail}
          alt="course img"
          className="object-cover w-[40%]"
          loading="lazy"
        />
        <p className="text-xl font-bold text-richblack-5">{course.courseName}</p>
      </div>
      <div className="flex flex-row gap-x-2 items-center justify-center">
        <MdCurrencyRupee className="text-xl" />
        {course.price}
      </div>
      <div className="flex items-center justify-center">
        <MdOutlineDelete
          className="text-2xl cursor-pointer hover:text-red-100 text-center hover:animate-pulse"
          onClick={() => dispatch(removeFromCart(course))}
        />
      </div>
    </Table.Row>
  );
};

export default CartTableRow;
