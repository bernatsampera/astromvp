import React, { useState } from 'react';
import { calculatePopularity, calculateRating, getOverallGymRanking } from '~/helpers/calculateRankings';
import Progress from './Progress';

import defaultGym from '~/assets/images/default_gym.webp';
const defaultGym2 = '~/assets/images/default_gym_2.webp';
const defaultGym3 = '~/assets/images/default_gym_3.webp';
// import bjjGyms from '~/data/bjjgyms.json';
import Search from './Search';
import { FilterService, type Filter } from '~/services/FilterService';
import type { GymType } from '~/types/gym';
import { map, tap } from 'rxjs';
import axios from 'axios';

export default function ListDisplay() {
  const [gyms, setGyms] = useState<GymType[]>([]);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

  // Subscription to handle activeFilters and gyms
  React.useEffect(() => {
    const subscription = FilterService.activeFilters$
      .pipe(
        tap((activeFilters) => {
          setActiveFilters(activeFilters);
        }),
        map((activeFilters) => activeFilters.find((f) => f.cityId))
      )
      .subscribe(async (selectedCity) => {
        console.log('cityId', selectedCity?.cityId);
        const gyms = await axios.get(`/api/gyms/${selectedCity?.cityId}`);
        setGyms(gyms.data);
      });

    return () => subscription.unsubscribe();
  }, [setGyms]);

  // Subscription to handle cities
  React.useEffect(() => {
    // const subscription =
    // return () => subscription.unsubscribe();
  }, [setGyms]);

  return (
    <>
      <div className="md:flex mb-2">
        <Search />
        <div className="flex flex-wrap items-center justify-center gap-4">
          {activeFilters.map((f) => (
            <button
              className="btn btn-sm btn-neutral rounded"
              onClick={() => FilterService.toggleFilter(f)}
              key={f.name}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {gyms.map((gym, index) => {
          // Define a helper function to normalize values between 0 and maxScore

          // Calculate normalized scores for each factor
          // const costValue = gym && calculateCost(gym.cost);
          const popularityValue = calculatePopularity(gym.numberOfReviews);
          const ratingValue = calculateRating(gym.stars);

          return (
            <div
              className="relative flex flex-col bg-base-200 rounded-box max-w-sm group cursor-zoom-in"
              key={gym.storeName}
            >
              {/* <img src={getDefaultImage(index)} alt="Gym photo" /> */}
              <img src={defaultGym.src} alt="Gym photo" />

              {/* group-hover:opacity-100 */}
              <div className=" opacity-0 group-hover:opacity-100 absolute inset-0 font-bold bg-black bg-opacity-85  grid grid-cols-2 gap-2 items-center px-5  py-10  text-white  text-nowrap transition-opacity duration-300 rounded-md">
                {/* <div className="opacity-0 opacity-100 absolute inset-0 font-bold bg-black bg-opacity-85  grid grid-cols-2 gap-2 items-center px-5  py-20  text-white  text-nowrap transition-opacity duration-300 rounded-md"> */}
                <div>🏆 Overall </div>
                <Progress
                  value={getOverallGymRanking({
                    costValue: undefined,
                    popularityValue,
                    ratingValue,
                    dropIn: undefined,
                  })}
                />
                <div>💰 Cost </div>
                <Progress />
                <div>🔥 Popularity </div>
                <Progress value={popularityValue} />
                <div>❤️ Liked </div>
                <Progress value={ratingValue} />
                {/* <div>🚪 Drop In </div> 
                <div className="text-center">{gym.dropIn ? '✅' : '❓'}</div> */}
                {/* <div>🥋 GI / No GI </div>
                <span> 🥋 🥋 🥋 🤼‍♀️ 🤼‍♀️ </span> */}
              </div>
              <div className="flex flex-col items-center gap-2 p-2">
                <h2 className="font-bold text-xl text-center	">{gym.storeName}</h2>
                {/* <p className="text-black text-center">{gym.address}</p> */}
                <span>{gym.stars}</span>
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
