import React, { useEffect } from 'react';
import { AiOutlineDown, AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { getAllCategories } from '../../redux/slices/categorySlice';
import { ACCOUNT_TYPE } from '../../utils/constants';
import Hamburger from './Hamburger';
import Loader from './Loader';
import ProfileDropdown from './ProfileDropdown';
// import { getAllCategories } from '../../services/operations/category';

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const totalItems = useSelector((store) => store.cart.totalItems);
  const user = useSelector((store) => store.profile.user);
  const { categories, status } = useSelector((store) => store.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  function handleShowCategories() {
    if (status === 'error')
      return <p className="text-md text-red-200">Error Fetching Categories!</p>;
    if (status === 'loading' || categories === null) return <Loader />;
    return categories.length === 0 ? (
      <div className="text-richblack-25">No categories found</div>
    ) : (
      categories.map((link) => (
        <Link to={`/catalog/${link._id}`} key={link._id}>
          <p className="text-richblack-900 p-3 m-2 text-md hover:bg-richblack-100 rounded-md">
            {link.name}
          </p>
        </Link>
      ))
    );
  }
  return (
    <>
      <div className="flex h-14 border-b-[1px] items-center border-b-richblack-700 ">
        <div className="flex w-11/12 items-center justify-between relative">
          <Link to={'/'}>
            <img src={logo} alt={`some thing`} width={160} height={42} loading="lazy" />
          </Link>
          <nav>
            <ul className="lg:flex md:flex hidden gap-x-6 text-richblack-25">
              {NavbarLinks.map((link) => {
                return (
                  <li key={link.id}>
                    {link.title === 'Catalog' ? (
                      <div className="flex gap-1 items-center group relative">
                        Category
                        <AiOutlineDown />
                        <div
                          className="invisible absolute right-0 translate-x-3 top-10
                                  flex flex-col rounded-md bg-richblack-25 p-4 text-richblack-900 trasition-all duration-500 group-hover:visible
                                  lg:w-[300px] z-10"
                        >
                          <div className="absolute right-2 bg-richblack-25 -translate-y-2 rounded-sm h-6 w-6 rotate-45 top-0"></div>
                          {handleShowCategories()}
                        </div>
                      </div>
                    ) : (
                      <NavLink
                        to={link.path}
                        className={({ isActive }) => (isActive ? 'text-yellow-25' : 'text-white')}
                      >
                        <p>{link.title}</p>
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          {/* cart and login signup wagera */}
          <div className="flex flex-row gap-x-4 items-center">
            {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && token && (
              <Link to="/cart">
                <div className="relative">
                  <AiOutlineShoppingCart className="text-[2rem] text-white hover:text-yellow-50" />
                  {totalItems > 0 && (
                    <p className="text-black absolute top-0 right-0 animate-bounce aspect-square rounded-full w-5 bg-yellow-50 text-sm text-center">
                      {totalItems}
                    </p>
                  )}
                </div>
              </Link>
            )}
            <div className="lg:flex md:flex hidden gap-x-2 items-center">
              {token === null && (
                <Link to="/login">
                  <button className="text-richblack-25 border-2 border-richblack-300 rounded-md p-2 hover:bg-yellow-200">
                    Log In
                  </button>
                </Link>
              )}
              {token === null && (
                <Link to="/signUp">
                  <button className="text-richblack-25 border-2 border-richblack-300 rounded-md p-2 hover:bg-yellow-200">
                    Sign Up
                  </button>
                </Link>
              )}
              {token !== null && <ProfileDropdown />}
            </div>
            <Hamburger />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
