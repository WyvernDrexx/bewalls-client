import { useAppSelector } from '../store';

const useLocal = function () {
  const local = useAppSelector(state => state.local);
  return local;
};

export { useLocal };
