import { RefObject, useEffect } from "react";

// arreglo de referencias
const useOutsideClick = (
    refs: RefObject<HTMLElement>[],
    callback: () => void,
    animationComplete: boolean = true
) => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const clickedOutsideAll = refs.every(ref => ref.current && !ref.current.contains(event.target as Node) && animationComplete);

            if (clickedOutsideAll) {
                callback();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [refs, callback]);
};

export default useOutsideClick;
