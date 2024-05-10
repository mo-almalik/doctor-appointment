import React, { useState } from 'react';
import { IoStar } from 'react-icons/io5';
import api from '../../services/api.js';
import { useParams } from 'react-router-dom';
import { TbLoader } from 'react-icons/tb';

export default function AddReview({onReviewAdded}) {
    const [rating, setRating] = useState(0); // حالة تخزين التقييم
    const [comment, setComment] = useState('');
    const [error,setError] = useState('') // حالة تخزين التعليق
    const { id } = useParams();
    const [loading,setLoading]=useState(false)

    const handleRating = (selectedRating) => {
        setRating(selectedRating); // تحديث حالة التقييم عند اختيار المستخدم
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value); // تحديث حالة التعليق عند تغيير النص
    };


    const getStarIcons = () => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <div
                    key={i}
                    className={`text-xl flex justify-center ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => handleRating(i)}
                >
                    <IoStar />
                </div>
            );
        }

        return stars;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true)
             await api.post(`/review/add/${id}`, {
                rating: rating,
                comment: comment
            });
            onReviewAdded();
            setLoading(false)
           
            
        } catch (error) {
           
           setError(error.response.data.message)

           setLoading(false)
        }
    };

    return (
        <div>
            <form className='flex flex-col gap-y-2 text-gray-600' onSubmit={handleSubmit}>
                <textarea
                    id='review'
                    className='border border-gray-300 rounded-md h-full p-2 outline-none'
                    placeholder='اضف تجربتك'
                    value={comment}
                    onChange={handleCommentChange}
                ></textarea>
                <div className='flex my-3'>{getStarIcons()}</div> 
                <span className='text-red-500 text-sm'> {error}</span>
               {loading ? <>
                <button className='flex justify-start items-center bg-main-200 w-fit px-5 h-10 leading-10 text-white rounded-md text-sm'>
                <TbLoader className='animate-spin' />
                </button>
               </> :<>
               <button className='flex justify-start bg-main w-fit px-5 h-10 leading-10 text-white rounded-md text-sm'>
                    اضف
                </button>
               </>}
               
            </form>
        </div>
    );
}
