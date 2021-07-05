import { useAppDispatch, useAppSelector } from '../store';
import { Alert, showAlert } from '../store/alerts';

type AlertMessage = {
  error?: string;
  success?: string;
  normal?: string;
  warning?: string;
};

const useAlerts = () => {
  const alerts = useAppSelector(state => state.alerts);
  const dispatch = useAppDispatch();
  const createAlert = (a: AlertMessage): Alert => {
    if (a.error) {
      return { message: a.error, type: 'error' };
    }
    if (a.success) {
      return { message: a.success, type: 'success' };
    }
    if (a.warning) {
      return { message: a.warning, type: 'warning' };
    }
    if (a.normal) {
      return { message: a.normal, type: 'normal' };
    }
    return { message: 'No message!', type: 'normal' };
  };
  const dispatchShowAlert = (alertMessage: AlertMessage) => {
    const alert = createAlert(alertMessage);
    dispatch(showAlert(alert));
  };
  return { alerts, dispatchShowAlert };
};

export { useAlerts };
