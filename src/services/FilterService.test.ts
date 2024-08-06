import { TestScheduler } from 'rxjs/testing';
import { FilterService, type Filter } from './FilterService';
import { ReplaySubject } from 'rxjs';

describe('FilterService', () => {
  let testScheduler;

  const mockFilters = [
    { name: 'Barcelona', isSelected: false },
    { name: 'Madrid', isSelected: true },
  ];

  beforeEach(() => {
    FilterService.filters$.next(mockFilters);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).deep.equal(expected);
    });
  });

  it('should find both cities when searchQuery is a', () => {
    const searchQuery = 'a'; // This will match 'Barcelona' and 'Madrid' as they both contain 'a'
    const expectedData = [
      mockFilters[0], // 'Barcelona' matches the query
      mockFilters[1], // 'Madrid' matches the query
    ];

    const replaySubject$ = new ReplaySubject<Filter[]>();
    FilterService.filteredData$.subscribe(replaySubject$);

    testScheduler.run(({ expectObservable }) => {
      FilterService.filters$.next(mockFilters);
      FilterService.searchSubject$.next(searchQuery);

      expectObservable(replaySubject$).toBe('a', { a: expectedData });
    });
  });

  it('should find just Barcelona cities when searchQuery is bar', () => {
    const searchQuery = 'bar'; // This will match 'Barcelona' and 'Madrid' as they both contain 'a'
    const expectedData = [
      mockFilters[0], // 'Barcelona' matches the query
    ];

    const replaySubject$ = new ReplaySubject<Filter[]>();
    FilterService.filteredData$.subscribe(replaySubject$);

    testScheduler.run(({ expectObservable }) => {
      FilterService.filters$.next(mockFilters);
      FilterService.searchSubject$.next(searchQuery);

      expectObservable(replaySubject$).toBe('a', { a: expectedData });
    });
  });

  // Doesn't work when searchSubject is a Subject instead of BehaviorSubject
  it('should not find anything when  searchQuery is zzzzzzz', () => {
    const searchQuery = 'zzzzzzz'; // This will match 'Barcelona' and 'Madrid' as they both contain 'a'
    const expectedData = [];

    const replaySubject$ = new ReplaySubject<Filter[]>();
    FilterService.filteredData$.subscribe(replaySubject$);

    testScheduler.run(({ expectObservable }) => {
      FilterService.filters$.next(mockFilters);
      FilterService.searchSubject$.next(searchQuery);

      expectObservable(replaySubject$).toBe('a', { a: expectedData });
    });
  });

  it('should toggle filter correctly', () => {
    FilterService.filters$.next(mockFilters);

    FilterService.toggleFilter({ name: 'Barcelona', isSelected: false });

    expect(FilterService.filters$.getValue()).toEqual([
      { name: 'Barcelona', isSelected: true }, // 'Barcelona' should be selected now
      { name: 'Madrid', isSelected: true },
    ]);
  });
});
