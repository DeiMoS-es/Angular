import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {inject} from '@angular/core';
import {ApiService} from '../api.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(ApiService);
  if(authService.getToken()){
    return true;
  }
  router.navigate(['login']);
  return false;
};
