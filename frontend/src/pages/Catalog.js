import React, { useEffect, useMemo, useState } from 'react';
import CategoryDetails from '../components/catalog/CategoryDetails';
import CategoryCourses from '../components/catalog/CategoryCourses';
import TopCourses from '../components/catalog/TopCourses';
import { useLocation } from 'react-router-dom';
import { getCategoryDetails } from '../services/operations/category';
import CurrentCategoryCourses from '../components/catalog/CurrentCategoryCourses';
import useFetchData from '../hooks/useFetchData';
import Error from '../components/common/Error';
import Shimmer from '../components/common/Shimmer';

const Catalog = () => {
  const location = useLocation();
  const paths = location.pathname.split('/');
  const categoryId = paths[paths.length - 1];
  const [categoryData, isError, isLoading] = useFetchData(
    getCategoryDetails,
    { categoryId },
    categoryId,
    true
  );
  const randomCategoryData = useMemo(
    function randomCategory() {
      const randInd = Math.floor(Math.random() * categoryData?.allCategory.length);
      const randCourses = categoryData?.allCategory[randInd].course;
      const randName = categoryData?.allCategory[randInd].name;
      return {
        courses: randCourses,
        name: randName
      };
    },
    [categoryData]
  );
  if (isLoading) {
    return <Shimmer number={3} style={`p-20 m-10`} flexDirection={`flex-col`} />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <>
      {/* current category description */}
      <CategoryDetails
        name={categoryData.currentCategory?.name}
        description={categoryData.currentCategory?.description}
      />
      <div className="m-10">
        {/* current category courses - swiper integration */}
        <CurrentCategoryCourses
          name={categoryData.currentCategory.name}
          courses={categoryData.currentCategory.course}
        />
        {/* courses of a random category other than the current category(a basic carousel) */}
        <CategoryCourses {...randomCategoryData} key={categoryData.currentCategory.name} />
        {/* Top selling courses */}
        <TopCourses data={categoryData.topSelling} />
      </div>
    </>
  );
};

export default Catalog;
