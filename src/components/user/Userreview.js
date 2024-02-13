import { IoStar } from "react-icons/io5";


const getStarIcons = (rating) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <div key={i} className={`text-xl flex justify-center  ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>
         <IoStar  /> 
      </div>
    );
  }

  return stars;
};

export default getStarIcons