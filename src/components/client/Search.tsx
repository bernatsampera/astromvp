import React, { useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { debounceTime, filter, fromEvent, merge, skipWhile, tap, throttle, throttleTime } from 'rxjs';
import { FilterService, type Filter } from '~/services/FilterService';

export default function Search() {
  const [filteredData, setFilteredData] = useState<Filter[]>([]);
  const [showModal, setShowModal] = useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // UseEffect to handle filteredData
  useEffect(() => {
    const subscription = FilterService.filteredData$.subscribe((data) => {
      setFilteredData(data);
    });

    return () => subscription.unsubscribe();
  }, [setFilteredData, setShowModal]);

  // UseEffect to Detect click outside modal and close it
  useEffect(() => {
    if (wrapperRef.current) {
      fromEvent(document, 'mousedown').subscribe((e: Event) => {
        if (wrapperRef.current?.contains(e.target as Node)) {
          setShowModal(true);
        } else {
          setShowModal(false);
        }
      });
    }

    const keyDown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(filter(({ key }) => key === 'Escape'));

    const subscription = merge(keyDown$).subscribe(() => setShowModal(false));

    return () => {
      subscription.unsubscribe();
    };
  }, [showModal, setShowModal]);

  useEffect(() => {
    let subscription;
    if (inputRef.current) {
      const input$ = fromEvent<ChangeEvent<HTMLInputElement>>(inputRef.current, 'input').pipe(
        filter((event) => event.target.value.length > 3),
        debounceTime(500)
      );

      subscription = input$.subscribe((event) => {
        FilterService.searchPlace(event.target.value);
      });
    }
    return () => {
      subscription.unsubscribe();
    };
  }, [inputRef.current]);

  return (
    <div className="flex">
      <div className="max-w-sm no-prose m-2" ref={wrapperRef}>
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
            ref={inputRef}
          />
        </div>
        {showModal && (
          <div className="absolute z-10 p-4 font-bold w-96 bg-base-200 ">
            <div className="flex flex-col w-fit">
              {filteredData.map((f, index) => (
                <button key={index} className="btn" onClick={() => FilterService.toggleFilter(f)}>
                  {f.name} {f.isSelected ? '✅' : '❌'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-4">
        {FilterService.filters$
          .getValue()
          .filter((f) => f.isSelected)
          .map((f) => (
            <button className="btn btn-sm" onClick={() => FilterService.toggleFilter(f)} key={f.name}>
              {' '}
              {f.name}{' '}
            </button>
          ))}
      </div>
    </div>
  );
}
