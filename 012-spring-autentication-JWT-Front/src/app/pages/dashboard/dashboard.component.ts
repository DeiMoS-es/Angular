import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { SharedCommunicationService } from 'src/app/services/shared/shared-communication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isLoggedIn: boolean = false;
  constructor(private sharedCommunicationService: SharedCommunicationService, private cdr: ChangeDetectorRef, private ngZone: NgZone){}

  ngOnInit(): void {
    console.log('Componente inicializado');

    this.sharedCommunicationService.loginStatus$.subscribe((status) => {
      console.log('Actualización de estado recibida:', status);
      
      this.ngZone.run(() => {
        this.isLoggedIn = status;
        console.log('isLoggedIn actualizado:', this.isLoggedIn);
        this.cdr.detectChanges();
      });
    });
  }

}
