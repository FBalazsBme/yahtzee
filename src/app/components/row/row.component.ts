import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Tile} from '../../interfaces/tile';
import {MatGridTile} from '@angular/material/grid-list';
import {DiceResult} from '../../interfaces/diceResult';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {

  btnDisabled = false;

  @Input() columns: Tile;
  @Input() diceValues: EventEmitter<Array<DiceResult>>;
  @Input() calculatorFn: ((data: DiceResult[]) => Observable<number>);

  @Output() subSumEmitter: EventEmitter<number>;
  subSum = 1;
  savedSubSum = 0;

  ngOnInit(): void {
    this.diceValues.subscribe(
      diceValues => {
        this.calculatorFn(diceValues).subscribe(result => this.subSum = result);
      });
  }

  saveResult(): void {
    this.savedSubSum = this.subSum;
    this.btnDisabled = true;
  }
}
