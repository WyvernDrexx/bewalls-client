import { useAppSelector } from '../store';

const useUser = function () {
  const user = useAppSelector(state => state.user);
  return user;
};

export { useUser };
