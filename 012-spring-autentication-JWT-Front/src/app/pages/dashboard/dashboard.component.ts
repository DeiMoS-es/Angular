import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { User } from 'src/app/interface/user';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isLoggedIn: boolean = false;
  token: string | null = null;
  userData: User | null = null;
  
  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone, private loginService: LoginService, private userService: UserService){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.isLoggedIn = userLoginOn;
        this.ngZone.run(() => {
          this.cdr.detectChanges();
        });
      }
    });
    //Compruebo cada vez que se carga el dashboard si el usuario ha hecho login
    this.comprobarToken();
    // Obtén la información actualizada del usuario después de iniciar sesión
    if (this.isLoggedIn) {
      this.userService.getUserData().subscribe((user) => {
        this.userData = user;
      });
    }
  };

  public comprobarToken(): void{
    this.token = this.loginService.getToken();
    if(this.token){
      this.isLoggedIn = true;
    }else
    {
      this.isLoggedIn = false;
    }
  }
}
