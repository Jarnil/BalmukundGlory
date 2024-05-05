import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUser = localStorage.getItem('token');

  if (!currentUser && state.url !== '/admin/login') {
    // User is not logged in and trying to access a protected route
    router.navigate(['/admin/login']);
    return false;
  } else if (currentUser && state.url === '/admin/login') {
    // User is logged in and trying to access the login page
    router.navigate(['/admin/dashboard']);
    return false;
  }
  return true;
};
