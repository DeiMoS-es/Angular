import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year: number = 0;

  constructor() {
    // Aquí puedes inicializar propiedades o realizar tareas de configuración
  }
  ngOnInit(): void {
    this.year = this.obtenerYear();
  }

  private obtenerYear() {
    return new Date().getFullYear();
  }
}
