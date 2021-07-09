import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ResultsComponent } from 'src/app/modals/results/results.component';
 
@Component({
  selector: 'app-dragboard',
  templateUrl: './dragboard.component.html',
  styleUrls: ['./dragboard.component.scss']
})
export class DragboardComponent {

  constructor(private dialog: MatDialog) {
    this.getStuffSetup();
  }
  inResults: number[] = []
  all = [];
  results = 0;
  makeshift = [];
  lives = 5;

  getStuffSetup(){
    this.makeshift=[]
    let min = 10000;
    let max = 100000;
    this.results = Math.floor(Math.random() * (max - min) + min);
    this.inResults = this.getListResult(this.results);
    let randomList: number[] = this.createRandomList(this.inResults);
    this.all = this.inResults.concat(randomList)
    this.all = this.all.sort((n1, n2) => n1 - n2).filter(function(elem, index, self) {
      return index === self.indexOf(elem);
  });
    this.lives = 5
  }
  getListResult = (results: number): number[] => {
    const factors = [];
    let divisor = 2;
    while (results >= 2) {
      if (results % divisor == 0) {
        factors.push(divisor);
        results = results / divisor;
      } else {
        divisor++;
      }
    }
    return factors;
  }

  createRandomList = (list: number[]): number[] => {
    if (list.length < 5) {
      return Array.from({ length: 4 }, () => Math.floor(Math.random() * (10 + Math.max(...list))));
    } else {
      return Array.from({ length: 6 }, () => Math.floor(Math.random() * (10 + Math.max(...list))));
    }
  }


  drop(event: CdkDragDrop<number[]>) {
    console.log(this.results % event.item.data)
    if (this.results % event.item.data === 0) {
      this.results = this.results / (event.item.data)
      if (event.previousContainer === event.container) {
        this.makeshift.push(event.item.data)
      }
      if (this.results == 1) {
        let dialogRef = this.dialog.open(ResultsComponent, {
          data: { header: 'YOU WIN!', footer: 'WIN WIN WIN!' },
        });
        this.getStuffSetup();
      }
    }
    else {
      this.lives = this.lives - 1
      if (this.lives == 0) {
        let dialogRef = this.dialog.open(ResultsComponent, {
          data: { header: 'YOU LOSE!', footer: 'Count Better' },
        });
        this.getStuffSetup();
      }
    }
  }
  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }
}
