import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavbarLinks } from '../../data/navbar-links';
import { useNavigate } from 'react-router-dom';
import HamburgerCategories from './HamburgerCategories';
import { IoCloseSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import ProfileLinks from './ProfileLinks';
const Hamburger = () => {
  const [open, setOpen] = useState(false);
  const token = useSelector((store) => store.auth.token);
  const { categories, status } = useSelector((store) => store.category);
  const navigate = useNavigate();
  function handleCategories() {
    if (status === 'loading' || categories === null)
      return <p className="text-md text-yellow-100">Loading Categories...</p>;
    if (status === 'error')
      return <p className="text-md text-red-200">Categories could not be fetched!</p>;
    return <HamburgerCategories setOpen={setOpen} />;
  }
  return (
    <div className="lg:hidden md:hidden">
      <GiHamburgerMenu
        className="text-white cursor-pointer justify-center"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="bg-white bg-opacity-10 backdrop-blur-sm fixed inset-0 flex z-10 items-center justify-end">
          <div className="flex flex-col gap-y-2 rounded-lg p-4 bg-richblack-50 relative w-[40%] h-full">
            <IoCloseSharp
              className="absolute text-2xl top-2 right-2 cursor-pointer"
              onClick={() => setOpen(false)}
            />
            {NavbarLinks.map((link) =>
              link.id === '2' ? (
                handleCategories()
              ) : (
                <p
                  key={link.id}
                  className="cursor-pointer border-black border-b-2"
                  onClick={() => {
                    setOpen(false);
                    navigate(link.path);
                  }}
                >
                  {link.title}
                </p>
              )
            )}
            {token ? (
              <ProfileLinks setOpen={setOpen} />
            ) : (
              <div
                className="flex flex-row gap-x-2 cursor-pointer"
                onClick={(e) => {
                  const text = e.target.textContent;
                  if (text === 'Log In') {
                    navigate('/login');
                    setOpen(false);
                  } else if (text === 'Sign Up') {
                    navigate('/signUp');
                    setOpen(false);
                  }
                }}
              >
                <p>Log In</p>
                <p>Sign Up</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
