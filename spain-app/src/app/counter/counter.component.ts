import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  public counter:number = 0;
  // increaseOne(){
  //   this.counter += 1;
  // }
  // decreaseOne(){
  //   this.counter -= 1;
  // }

  increaseBy(value: number){
    this.counter += value;
  }
}
