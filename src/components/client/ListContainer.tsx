import React, { useState } from 'react';

import Search from './Search';
import { FilterService, type Filter } from '~/services/FilterService';
import type { GymType } from '~/types/gym';
import { map, tap } from 'rxjs';
import axios from 'axios';
import ListDisplay from './ListDisplay';

export default function ListContainer() {
  const [gyms, setGyms] = useState<GymType[]>([]);
  const [cityId, setCityId] = useState<number | null>(null);

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
        if (selectedCity?.cityId) {
          setCityId(selectedCity?.cityId);
          const gyms = await axios.get(`/api/gyms/${selectedCity?.cityId}`);
          setGyms(gyms.data);
        }
      });

    return () => subscription.unsubscribe();
  }, [setGyms]);

  return (
    <div className=" flex-col w-full  items-center justify-center">
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
      <ListDisplay gyms={gyms} cityId={cityId} />
    </div>
  );
}
