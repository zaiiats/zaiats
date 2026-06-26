"use client";

import {useSyncExternalStore } from "react";

const positionStyles = {
  top: "top-0 h-4 w-full",
  bottom: "bottom-0 h-4 w-full",
  left: "left-0 w-4 h-full",
  right: "right-0 w-4 h-full",
};

const Frame = () => {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isClient) return null;

  return (
    <div className="absolute h-dvh w-full pointer-events-none">
      {(Object.keys(positionStyles) as Array<keyof typeof positionStyles>).map(
        (position) => (
          <div
            key={position}
            className={`absolute z-10000 bg-(--frame-color) transition-all duration-150 ease-in-out ${positionStyles[position]}`}
          />
        ),
      )}
    </div>
  );
};

export default Frame;
