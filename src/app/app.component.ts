import {Component, EventEmitter} from '@angular/core';
import {Tile} from './interfaces/tile';
import {DiceResult} from './interfaces/diceResult';
import {Observable, of} from 'rxjs';
import {count, filter, map, max, mergeMap, reduce, toArray} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  rollDice = new EventEmitter();
  title = 'yahtzee';
  diceValues = new Array<DiceResult>();
  emitValues = new EventEmitter<Array<DiceResult>>();
  compareFn = (a: DiceResult, b: DiceResult) => {
    if (a.diceValue < b.diceValue) {
      return -1;
    }
    if (a.diceValue > b.diceValue) {
      return 1;
    }
    return 0;
  }

  callbacks: ((data: DiceResult[]) => Observable<number>)[] = [((data) => {

    return of(...data)
      .pipe(
        filter(element => element.diceValue === 1),
        map(element => element.diceValue),
        reduce((k, l) => k + l, 0)
      );
  }),
    ((data) => {
      return of(...data)
        .pipe(
          filter(element => element.diceValue === 2),
          map(element => element.diceValue),
          reduce((k, l) => k + l, 0)
        );
    }),
    ((data) => {
      return of(...data)
        .pipe(
          filter(element => element.diceValue === 3),
          map(element => element.diceValue),
          reduce((k, l) => k + l, 0)
        );
    }),
    ((data) => {
      return of(...data)
        .pipe(
          filter(element => element.diceValue === 4),
          map(element => element.diceValue),
          reduce((k, l) => k + l, 0)
        );
    }),
    ((data) => {
      return of(...data)
        .pipe(
          filter(element => element.diceValue === 5),
          map(element => element.diceValue),
          reduce((k, l) => k + l, 0)
        );
    }),
    ((data) => {
      return of(...data)
        .pipe(
          filter(element => element.diceValue === 6),
          map(element => element.diceValue),
          reduce((k, l) => k + l, 0)
        );
    }),
    ((data) => {
      return of(0);
    }),
    ((data) => {
      return of(0);
    }),
    ((data) => {
      return of(0);
    }),
    ((data) => {
      return of(0);
    }),
    ((data) => {
      return of(0);
    })
  ];

  tiles: Tile[] = [
    {text: 'Aces', cols: 1, rows: 1},

    {text: 'Twos', cols: 1, rows: 1},

    {text: 'Threes', cols: 1, rows: 1},

    {text: 'Fours', cols: 1, rows: 1},

    {text: 'Fives', cols: 1, rows: 1},

    {text: 'Sixes', cols: 1, rows: 1},

    {text: 'Three Of A Kind', cols: 1, rows: 1},

    {text: 'Four Of A Kind', cols: 1, rows: 1},

    {text: 'Small Straight', cols: 1, rows: 1},

    {text: 'Small Straight', cols: 1, rows: 1},

    {text: 'Full House', cols: 1, rows: 1}
  ];
  sum = 0;

  rollBtnClicked(): void {
    this.diceValues = new Array<DiceResult>();
    this.rollDice.emit();
  }

  diceRolled($event: DiceResult): void {
    this.diceValues.push($event);
    if (this.diceValues.length > 4) {
      this.emitValues.emit(this.diceValues);
    }
  }
}
