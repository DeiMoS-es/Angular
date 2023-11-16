import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isLoggedIn: boolean = false;//el usuario cuando inicia por primera vez no esta logueado
  constructor(private loginService: LoginService){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.isLoggedIn = userLoginOn;
        }
      }
    )
  }
}
