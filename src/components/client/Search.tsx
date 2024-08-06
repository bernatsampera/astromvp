import React, { useEffect, useState } from 'react';
import { filter, fromEvent, merge, tap } from 'rxjs';
import { FilterService, type Filter } from '~/services/FilterService';

export default function Search() {
  const [filteredData, setFilteredData] = useState<Filter[]>([]);
  const [showModal, setShowModal] = useState(false);

  // UseEffect to handle filteredData
  useEffect(() => {
    const subscription = FilterService.filteredData$.subscribe((data) => {
      setFilteredData(data);
      setShowModal(data.length > 0);
    });

    return () => subscription.unsubscribe();
  }, [setFilteredData, setShowModal]);

  // UseEffect to Detect click outside modal and close it
  useEffect(() => {
    const documentClick$ = fromEvent(document, 'click').pipe(
      filter((event) => !(event.target as Element).closest('.absolute'))
    );
    const keyDown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(filter(({ key }) => key === 'Escape'));

    const subscription = merge(documentClick$, keyDown$).subscribe(() => setShowModal(false));

    return () => {
      subscription.unsubscribe();
    };
  }, [showModal, setShowModal]);

  return (
    <div className="max-w-sm no-prose m-2">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-primary sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">🔍</div>
        <input
          type="search"
          id="default-search"
          className="block  input w-full p-4 ps-10 text-md font-bold text-primary border border-gray-300 rounded-lg bg-base-100 focus:ring-4 focus:outline-none focus:ring-primary"
          placeholder="Search or filter"
          onChange={(e) => {
            FilterService.searchSubject$.next(e.target.value);
          }}
          required
          autoComplete="off"
        />
      </div>
      {showModal && (
        <div className="absolute z-10 p-4 font-bold w-96 bg-base-200 ">
          <div className="flex flex-col w-fit">
            {filteredData.map((item, index) => (
              <button key={index} className="btn" onClick={() => FilterService.toggleFilter(item)}>
                {item.name} {item.isSelected ? 'IsSelected' : 'NotSelected'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
