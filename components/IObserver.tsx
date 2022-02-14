import React, { FC, useEffect, useRef } from "react";

interface IObserverProps {
  onIntersecting: () => void;
}

export const IObserver: FC<IObserverProps> = ({ onIntersecting }) => {
  const observerElement = useRef<HTMLDivElement>(null);
  const loaderCb = useRef(onIntersecting);

  useEffect(() => {
    loaderCb.current = onIntersecting;
  }, [onIntersecting]);

  useEffect(() => {
    if (observerElement.current) {
      const ibCallback: IntersectionObserverCallback = (entries) => {
        entries.forEach((enty) => {
          if (enty.isIntersecting) {
            loaderCb.current();
          }
        });
      };

      const observer = new IntersectionObserver(ibCallback);
      const element = observerElement.current;
      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    }
  }, [observerElement]);

  return <div ref={observerElement} />;
};
