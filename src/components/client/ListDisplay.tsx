import React from 'react';
import { calculateCost, calculatePopularity, calculateRating, getOverallGymRanking } from '~/helpers/calculateRankings';
import Progress from './Progress';

import defaultGym from '~/assets/images/default_gym.webp';
const defaultGym2 = '~/assets/images/default_gym_2.webp';
const defaultGym3 = '~/assets/images/default_gym_3.webp';
import bjjGyms from '~/data/bjjgyms.json';
import Search from './Search';

export default function ListDisplay() {
  return (
    <>
      <Search />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bjjGyms.map((gym, index) => {
          // Define a helper function to normalize values between 0 and maxScore

          // Calculate normalized scores for each factor
          const costValue = gym.cost && calculateCost(gym.cost);
          const popularityValue = calculatePopularity(gym.reviews);
          const ratingValue = calculateRating(gym.rating);

          return (
            <div className="relative flex flex-col bg-base-200 rounded-box max-w-sm group cursor-zoom-in">
              {/* <img src={getDefaultImage(index)} alt="Gym photo" /> */}
              <img src={defaultGym.src} alt="Gym photo" />

              {/* group-hover:opacity-100 */}
              <div className=" opacity-0 group-hover:opacity-100 absolute inset-0 font-bold bg-black bg-opacity-85  grid grid-cols-2 gap-2 items-center px-5  py-10  text-white  text-nowrap transition-opacity duration-300 rounded-md">
                {/* <div className="opacity-0 opacity-100 absolute inset-0 font-bold bg-black bg-opacity-85  grid grid-cols-2 gap-2 items-center px-5  py-20  text-white  text-nowrap transition-opacity duration-300 rounded-md"> */}
                <div>🏆 Overall </div>
                <Progress
                  value={getOverallGymRanking({
                    costValue,
                    popularityValue,
                    ratingValue,
                    dropIn: gym.dropIn,
                  })}
                />
                <div>💰 Cost </div>
                <Progress />
                <div>🔥 Popularity </div>
                <Progress value={popularityValue} />
                <div>❤️ Liked </div>
                <Progress value={ratingValue} />
                <div>🚪 Drop In </div>
                <div className="text-center">{gym.dropIn ? '✅' : '❓'}</div>
                <div>🥋 GI / No GI </div>
                <span> 🥋 🥋 🥋 🤼‍♀️ 🤼‍♀️ </span>
              </div>
              <div className="flex flex-col items-center gap-2 p-2">
                <h2 className="font-bold text-xl">{gym.name}</h2>
                <p className="text-black text-center">{gym.location}</p>
                <span>{gym.rating}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

const getDefaultImage = (index) => {
  if (index % 3 === 0) {
    return defaultGym3;
  } else if (index % 2 === 0) {
    return defaultGym2;
  }

  return defaultGym;
};
