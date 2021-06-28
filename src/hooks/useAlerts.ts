import { useAppSelector } from '../store';

const useAlerts = () => {
  const alerts = useAppSelector(state => state.alerts);
  return alerts;
};

export { useAlerts };
