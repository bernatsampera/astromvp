import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Progress({ value }: { value?: number }) {
  function getProgressClass(value) {
    if (value > 60) {
      return 'progress-success';
    } else if (value > 40) {
      return 'progress-warning';
    } else if (value > 0) {
      return 'progress-error';
    }

    return 'bg-primary-content';
  }
  return (
    <div>
      {!value ? (
        <div className="text-center font-extrabold text-white">N/A</div>
      ) : (
        <progress
          className={twMerge(`progress w-full h-3 rounded-full bg-opacity-30 bg-base-300`, getProgressClass(value))}
          value={value ?? 0}
          max="100"
        />
      )}
    </div>
  );
}
