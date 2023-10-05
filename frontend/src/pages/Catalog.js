import React, { useEffect, useState } from 'react'
import CategoryDetails from '../components/catalog/CategoryDetails'
import CategoryCourses from '../components/catalog/CategoryCourses'
import TopCourses from '../components/catalog/TopCourses'
import { useLocation } from 'react-router-dom'
import { getCategoryDetails } from '../services/operations/category'

const Catalog = () => {
  const [categoryData,setCategoryData] = useState({})
  const location = useLocation()
  const paths = location.pathname.split('/')
  const catId = paths[paths.length-1]
  console.log("cat",catId)
  async function fetchCategoryDetails(){
    const details = await getCategoryDetails(catId)
    console.log(details)
    if(details) setCategoryData(details)
  }
  useEffect(()=>{
    fetchCategoryDetails()
  },[catId])
  return (
    <>
        <CategoryDetails name = {categoryData.currentCategory?.name} description = {categoryData.currentCategory?.description}/>
        <CategoryCourses data = {categoryData.course}/>
        <TopCourses/>
    </>
  )
}

export default Catalog