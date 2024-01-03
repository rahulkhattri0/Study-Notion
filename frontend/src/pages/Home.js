import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import HighlightedText from '../components/core/Home/HighlightedText';
import CTAButton from '../components/core/Home/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/Home/CodeBlocks';
const Home = () => {
  console.log('rendererererer');
  return (
    <div>
      {/* Section1 */}
      <div className="mt-16 p-1 relative mx-auto flex flex-col w-11/12 text-white items-center">
        <Link to={'/signUp'}>
          <div className="border-richblack-500 bg-richblack-700 mx-auto rounded-full border-r-richblack-800 font-bold trasition-all text-richblack-200 duration-200 hover:scale-95  hover:bg-richblack-900">
            <div className="flex gap-3 items-center px-10 py-[5px]">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="mt-7 text-center text-4xl font-demibold">
          Empower Your Future with
          <HighlightedText text={'Coding Skills'} />
        </div>
        <div className="w-[70%] text-center font-bold text-richblack-300 mt-4">
          With our online coding courses, you can learn at your own pace, from anywhere in the
          world, and get access to a wealth of resources, including hands-on projects, quizzes, and
          personalized feedback from instructors.
        </div>
        <div className="mt-8 flex gap-7">
          {/* cta stands for call to action */}
          <CTAButton active={true} linkto={'/signUp'}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={'/login'}>
            Book a Demo
          </CTAButton>
        </div>
        <div className="shadow-blue-200 mx-3 my-7 w-[80%] shadow-lg">
          <video muted loop src={Banner} autoPlay></video>
        </div>
        {/* code section 1  */}
        <div className="w-[90%] flex flex-col">
          <CodeBlocks
            position={'lg:flex-row md:flex-row flex-col'}
            heading={
              <div className="text-4xl font-semibold">
                Unclock your <HighlightedText text={'coding potential'} /> with our courses
              </div>
            }
            subHeading={
              'Our courses are designed and taught by industry experts who have years of experience \
                        in coding and are passionate about sharing their knowledge with you.'
            }
            ctabtn1={{
              text: 'Try it yourself',
              linkto: '/signUp',
              active: true
            }}
            ctabtn2={{
              text: 'Learn More',
              linkto: '/login',
              active: false
            }}
            codeblock={`<!DOCTYPE HTML>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>
                        <h1><a href="/">Header</a>\n/h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>`}
            codeColor={'text-yellow-25'}
          />
          {/* code section 2 */}
          <CodeBlocks
            position={'lg:flex-row-reverse md:flex-row-reverse flex-col'}
            heading={
              <div className="text-4xl font-semibold">
                Start <HighlightedText text={'coding in seconds'} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              text: 'Continue Lesson',
              linkto: '/login',
              active: true
            }}
            ctabtn2={{
              text: 'Learn More',
              linkto: '/signUP',
              active: false
            }}
            codeblock={`let num1 = 5;\nlet num2 = 10;\nlet sum = num1 + num2;\nlet difference = num1 - num2;\nlet product = num1 * num2;
                        \nlet quotient = num1 / num2;\nconsole.log("Difference:", difference);\nconsole.log("Product:", product);\nconsole.log("Quotient:", quotient);`}
            codeColor={'text-pink-25'}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
