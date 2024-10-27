import { RefObject, useEffect } from 'react';

export const useOutsideClick = <T extends HTMLElement>(ref: RefObject<T>, onClose: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, onClose]);
};
