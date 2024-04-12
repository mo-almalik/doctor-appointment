import React, { useEffect, useState } from 'react'
import api from '../../services/api.js'
import getStarIcons from '../user/Userreview.js'
import { TbLoader } from 'react-icons/tb'

export default function DoctorReviews() {
    const [review ,setReview] = useState([])
    const [loading,setLoading]=useState(false)

   async function getReview (){
    setLoading(true)
     const {data} = await api.get('/review').catch((e)=>console.log(e))
        setReview(data?.review)
        setLoading(false)
     
    }
      
    useEffect(()=>{
getReview()
    },[])
  return (
    <div className='h-full'>

     
        <h5>التقييمات</h5> 
 {loading ? <>
    <TbLoader className='animate-spin' />
 </>: <>
        {review.map((item,index)=>  <div key={index} className='bg-gray-200 bg-opacity-60 rounded-md px-5 text-gray-600 '>
             <div className='my-5 flex em:flex-col sm:flex-col gap-2 justify-between py-5'>
             <div className=''>{item.user.username} </div>
             <div >{item.comment} </div>
             <div className='flex'>
             { item.rating ? getStarIcons(item.rating)   : "" } 
             </div>
             </div>
           </div>
           )}
           </>
 }
      
    </div>
  )
}
