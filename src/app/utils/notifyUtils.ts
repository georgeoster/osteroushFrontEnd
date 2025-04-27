// import { MatSnackBar } from "@angular/material/snack-bar";

// export const notify = (snackBar:MatSnackBar, message:string, panelClass:string) => {
//     snackBar.open(message, 'X', {
//       duration: 3000,
//       verticalPosition: 'top',
//       horizontalPosition: 'center',
//       panelClass: ['snackBar', panelClass]
//     });
//   }



import { ToastService } from '../services/toast.service';

export const notify = (toastService: ToastService, message: string, type: 'success' | 'error' = 'success') => {
  toastService.show(message, type);
};
