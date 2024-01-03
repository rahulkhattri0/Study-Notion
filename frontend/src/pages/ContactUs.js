import React from 'react';
import ContactForm from '../components/ContactPage/ContactForm';
const ContactUs = () => {
  return (
    <div className="mx-auto flex flex-col gap-3 my-auto max-w-[450px]">
      <p className="text-2xl text-richblack-5 font-bold">
        Got an Idea? We've got the skills. Let's team up
      </p>
      <p className="text-richblack-100 mb-2">
        Tell us more about yourself and what you're got in mind.
      </p>
      <ContactForm />
    </div>
  );
};

export default ContactUs;
