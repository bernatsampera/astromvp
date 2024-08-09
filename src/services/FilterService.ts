import { BehaviorSubject, combineLatest, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import axios from 'axios';

export type Filter = {
  name: string;
  isSelected: boolean;
};

const searchSubject$ = new BehaviorSubject<string>(''); // Works when BehaviorSubject
const mockFilters: Filter[] = [
  { name: 'Nogi', isSelected: false },
  { name: 'High Level Coach', isSelected: false },
  { name: 'Cheap', isSelected: false },
  { name: 'Expensive', isSelected: false },
  { name: 'Popular', isSelected: false },
  { name: 'New/Unknown', isSelected: false },
];

const baseFilters$ = new BehaviorSubject(mockFilters);
const cities$ = new BehaviorSubject<Filter[]>([]);

export const FilterService = {
  searchSubject$,
  cities$,
  baseFilters$,
  filteredData$: combineLatest([searchSubject$, baseFilters$, cities$]).pipe(
    tap((v) => console.log('v', v)),
    map(([searchQuery, filters, cities]) =>
      [...filters, ...cities].filter((x) => x.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  ),
  toggleFilter: (filter: Filter) => {
    const currentFilters = baseFilters$.getValue();
    const currentCities = cities$.getValue();

    const updatedFilters = currentFilters.map((f) =>
      f.name === filter.name ? { ...f, isSelected: !f.isSelected } : f
    );

    if (currentCities.map((v) => v.name).includes(filter.name)) {
      const updatedCities = currentCities.map((f) =>
        f.name === filter.name ? { ...f, isSelected: !f.isSelected } : { ...f, isSelected: false }
      );
      cities$.next(updatedCities);
    }

    baseFilters$.next(updatedFilters);
  },
  async searchPlace(inputStr: string) {
    const cities = await axios.get(`/api/cities?search=${inputStr}`);
    const resultToFilters = cities.data.map((c) => ({ name: `${c.city}, ${c.country}`, isSelected: false }));

    const currentFilters = baseFilters$.getValue();
    const currentFiltersName = currentFilters.map((f) => f.name);

    const filterResults = resultToFilters.filter((f) => !currentFiltersName.includes(f.name));

    cities$.next(filterResults);
  },
};
