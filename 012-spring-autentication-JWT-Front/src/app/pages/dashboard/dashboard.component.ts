import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isLoggedIn: boolean = false;
  token: string | null = null;
  
  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone, private loginService: LoginService){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.isLoggedIn = userLoginOn;
          this.ngZone.run(() => {
            this.cdr.detectChanges();
          });
        }
      }
    );
      this.comprobarToken();    
  }
  
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
