import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import axios from 'axios';

export type Filter = {
  name: string;
  isSelected: boolean;
};

const searchSubject$ = new Subject<string>(); // Works when BehaviorSubject
const mockFilters: Filter[] = [
  { name: 'Barcelona', isSelected: false },
  { name: 'Madrid', isSelected: false },
];

const filters$ = new BehaviorSubject(mockFilters);

export const FilterService = {
  searchSubject$,
  filters$,
  filteredData$: combineLatest([searchSubject$, filters$]).pipe(
    map(([searchQuery, data]) => data.filter((x) => x.name.toLowerCase().includes(searchQuery.toLowerCase())))
  ),
  toggleFilter: (filter: Filter) => {
    const currentFilters = filters$.getValue();
    const updatedFilters = currentFilters.map((f) =>
      f.name === filter.name ? { ...f, isSelected: !f.isSelected } : f
    );
    filters$.next(updatedFilters);
  },
  async searchPlace(inputStr: string) {
    console.log('searching for x', inputStr);
    const gyms = await axios.get(`/api/gyms?city=${inputStr}`);

    const resultToFilters = gyms.data.map((gym) => ({ name: gym.name, isSelected: false }));

    const currentFilters = filters$.getValue();
    const currentFiltersName = currentFilters.map((f) => f.name);

    const filterResults = resultToFilters.filter((f) => !currentFiltersName.includes(f.name));
    console.log('filterResults', filterResults);

    filters$.next([...currentFilters, ...filterResults]);
  },
};
