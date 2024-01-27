import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const authStatus=inject(AuthService)
  const router =inject(Router)
  if(authStatus.isLogged())
  {
    return true;
  }
  else
  {
    Swal.fire({
      icon: "info",
      title: "Oops...",
      text: "Please login",
      
    });
    router.navigateByUrl("")
    return false
  }
  
};
