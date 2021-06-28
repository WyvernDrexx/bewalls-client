import { useAppDispatch, useAppSelector } from '../store';
import { Alert, showAlert } from '../store/alerts';

const useAlerts = () => {
  const alerts = useAppSelector(state => state.alerts);
  const dispatch = useAppDispatch();
  const dispatchShowAlert = (alert: Alert) => dispatch(showAlert(alert));
  return { alerts, dispatchShowAlert };
};

export { useAlerts };
