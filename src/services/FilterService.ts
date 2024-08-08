import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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
  searchPlace(inputStr: string) {
    console.log('searching for x', inputStr);
  },
};
