import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ResultsComponent } from 'src/app/modals/results/results.component';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { take } from 'rxjs/operators'
import { User } from 'src/app/dbmodels/user';

@Component({
  selector: 'app-dragboard',
  templateUrl: './dragboard.component.html',
  styleUrls: ['./dragboard.component.scss']
})
export class DragboardComponent implements OnInit, OnDestroy {
  
  ngOnInit(){
    this.timed = timer(500, 500)

    this.timed.subscribe(() => {
        this.array$.pipe(take(1)).subscribe(val => {
          this.timeNow = new Date()
          const newArr = this.alterVar - Math.abs(Math.floor((this.start.getTime() - this.timeNow.getTime()) / 1000));
          if (0 >= newArr) {
            this.modaler('YOU LOSE!', 'Count Better'),
              this.getStuffSetup();
          }
          this.subject.next(newArr);
        })
      })
  }
  ngOnDestroy() {
    this.subject.complete()
}
  constructor(private dialog: MatDialog) {
    this.getStuffSetup();
  }
  timed?: Observable<number>;
  user?: User;
  alterVar: number = 15
  subject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  array$: Observable<any> = this.subject.asObservable();
  inResults: number[] = []
  all = [];
  results = 0;
  makeshift = [];
  lives = 5;
  extra?: number[]
  start?: Date;
  timeNow?: Date;
  timeElapsed?: number;



  getStuffSetup() {
    this.start = new Date()
    this.makeshift = []
    let min = 10000;
    let max = 100000;
    let results1 = []
    for (let x = 0; x < 10; x++) {
      let y = Math.floor(Math.random() * (max - min) + min);
      if (y % 2 == 0 || y % 3 == 0 || y % 4 == 0) results1.push(y);
    }
    this.inResults = this.getListResult(results1);
    let randomList: number[] = this.createRandomList(this.results, this.inResults);
    this.all = this.inResults.concat(randomList)
    this.all = this.all.sort((n1, n2) => n1 - n2).filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    }).map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
    this.extra = []
    let y = 0
    while (y < this.all.length / 2) {
      let x = this.all.pop()
      this.extra.push(x);
      y++
    }
    let x = this.all.pop()
    this.extra.push(x);
    this.lives = 5
  }
  getListResult = (results: number[]): number[] => {
    let factors: number[] = [];
    let factors1: number[] = [];
    let divisor = 2;
    //console.log(results)
    for (let result of results) {
      let initresult = JSON.parse(JSON.stringify(result))
      while (result >= 2) {
        if (result % divisor == 0) {
          factors1.push(divisor);
          result = result / divisor;
        } else {
          divisor++;
        }
        if (divisor > result) {
          break
        }
      }
      //console.log(result)
      if (factors1.length > factors.length) {
        factors = JSON.parse(JSON.stringify(factors1))
        this.results = initresult
      }
      factors1 = [];
    }
    //console.log(factors)
    return factors;
  }

  createRandomList = (results, list: number[]): number[] => {
    if (list.length < 5) {
      let x = Array.from({ length: 1 }, () => Math.floor(Math.random() * results))
      let y = Array.from({ length: 1 }, () => Math.floor(Math.random() * results / 2))
      let z = Array.from({ length: 3 }, () => Math.floor(Math.random() * results / 100))
      return (x.concat(y).concat(z));
    } else {
      let x = Array.from({ length: 1 }, () => Math.floor(Math.random() * results))
      let y = Array.from({ length: 1 }, () => Math.floor(Math.random() * results / 2))
      let z = Array.from({ length: 5 }, () => Math.floor(Math.random() * results / 100))
      return (x.concat(y).concat(z));
    }
  }

  drop(event: CdkDragDrop<number[]>) {
    //console.log(this.results % event.item.data)
    if (this.results % event.item.data === 0) {
      this.results = this.results / (event.item.data)
      this.makeshift.push(event.item.data)
      this.start = new Date();
      if (this.results == 1) {
        this.modaler('YOU WIN!', 'You can count!'),
          this.getStuffSetup();
      }
    }
    else {
      this.lives = this.lives - 1
      this.alterVar = this.alterVar - 1
      if (this.lives == 0) {
        this.modaler('YOU LOSE!', 'Count Better'),
          this.getStuffSetup();
      }
    }
  }
  modaler(header: string, footer: string) {
    this.dialog.open(ResultsComponent, {
      data: { header: header, footer: footer },
    });
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }

}
