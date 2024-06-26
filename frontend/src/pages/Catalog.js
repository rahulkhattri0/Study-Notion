import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import CategoryCourses from '../components/catalog/CategoryCourses';
import CategoryDetails from '../components/catalog/CategoryDetails';
import CurrentCategoryCourses from '../components/catalog/CurrentCategoryCourses';
import TopCourses from '../components/catalog/TopCourses';
import Error from '../components/common/Error';
import Shimmer from '../components/common/Shimmer';
import useFetchData from '../hooks/useFetchData';
import { getCategoryDetails } from '../services/operations/category';

const Catalog = () => {
  const location = useLocation();
  const paths = location.pathname.split('/');
  const categoryId = paths[paths.length - 1];
  const apiFunction = useMemo(() => {
    return getCategoryDetails(categoryId);
  }, [categoryId]);
  const [categoryData, isError, isLoading] = useFetchData(apiFunction);
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
  if (isError) {
    return <Error />;
  }
  if (isLoading || categoryData === null) {
    return <Shimmer number={3} style={`p-20 m-10`} flexDirection={`flex-col`} />;
  }
  return (
    <>
      {/* current category description */}
      <CategoryDetails
        name={categoryData.currentCategory?.name}
        description={categoryData.currentCategory?.description}
      />
      <div className="m-4 md:m-10">
        {/* current category courses - swiper integration */}
        <CurrentCategoryCourses
          name={categoryData.currentCategory.name}
          courses={categoryData.currentCategory.course}
        />
        {/* courses of a random category other than the current category(a basic carousel) */}
        <CategoryCourses {...randomCategoryData} />
        {/* Top selling courses */}
        <TopCourses data={categoryData.topSelling} />
      </div>
    </>
  );
};

export default Catalog;
