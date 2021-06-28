import { useAppDispatch, useAppSelector } from '../store';
import { Alert, showAlert } from '../store/alerts';

const useAlerts = () => {
  const alerts = useAppSelector(state => state.alerts);
  const dispatch = useAppDispatch();
  const dispatchAlert = (alert: Alert) => dispatch(showAlert(alert));
  return { alerts, dispatchAlert };
};

export { useAlerts };
