import React from 'react'

const Tab = ({setHighlghted,highlighted,tabData}) => {
  return (
    <div className='flex rounded-full gap-x-1 p-1 bg-richblack-800 h-max text-lg max-w-max'>
        {   
            tabData.map((data)=>{
                return (
                    <button key={data.id} 
                    onClick={()=>setHighlghted(data.type)}
                    className={`${data.type===highlighted ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200" }
                    trasition-all rounded-full duration-200 px-5 py-2`}>
                        {data.type}
                    </button>
                )
            })
        }
    </div>
  )
}

export default Tab