
import { ToastService } from '../services/toast.service';

export const notify = (toastService: ToastService, message: string, type: 'success' | 'error' = 'success') => {
  toastService.show(message, type);
};
