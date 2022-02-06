import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DiceResult} from '../../interfaces/diceResult';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements OnInit {

  @Input() rollDice: EventEmitter<number>;
  @Input() index: number;
  @Output() diceValueOut = new EventEmitter<DiceResult>();

  diceValue = 1;

  constructor() {
  }

  ngOnInit(): void {
    this.rollDice.subscribe(x => {
      this.diceValue = Math.floor(6 * Math.random()) + 1;
      this.diceValueOut.emit({diceValue: this.diceValue, diceLocation: this.index});
    });
  }

}
