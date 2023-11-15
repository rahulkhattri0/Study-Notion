import React, { useEffect, useState } from 'react'
import CategoryDetails from '../components/catalog/CategoryDetails'
import CategoryCourses from '../components/catalog/CategoryCourses'
import TopCourses from '../components/catalog/TopCourses'
import { useLocation } from 'react-router-dom'
import { getCategoryDetails } from '../services/operations/category'
import CurrentCategoryCourses from '../components/catalog/CurrentCategoryCourses'

const Catalog = () => {
  const [categoryData,setCategoryData] = useState()
  const location = useLocation()
  const paths = location.pathname.split('/')
  const catId = paths[paths.length-1]
  async function fetchCategoryDetails(){
    const details = await getCategoryDetails(catId)
    console.log(details)
    if(details) setCategoryData(details)
  }
  useEffect(()=>{
    fetchCategoryDetails()
  },[catId])
  function randomCategory(){
    const randInd = Math.floor(Math.random() * categoryData.allCategory.length)
    const randCourses = categoryData.allCategory[randInd].course
    const randName = categoryData.allCategory[randInd].name
    return {
      courses : randCourses,
      name : randName
    }
  }
  return (
    <>
        {
          categoryData && 
          (
            <>
              {/* current category description */}
              <CategoryDetails name = {categoryData.currentCategory?.name} description = {categoryData.currentCategory?.description}/>
              {/* current category courses - swiper integration */}
              <CurrentCategoryCourses name = {categoryData.currentCategory.name} courses = {categoryData.currentCategory.course} />
              {/* courses of a random category other than the current category(a basic carousel) */}
              <CategoryCourses {...randomCategory()}/>
              {/* Top selling courses */}
              <TopCourses data = {categoryData.topSelling}/>
            </>
          )
        }
    </>
  )
}

export default Catalog