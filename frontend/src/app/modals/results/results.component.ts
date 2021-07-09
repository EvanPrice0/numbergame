import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ResultsComponent>, @Inject(MAT_DIALOG_DATA) public data: {header: string, footer: string}){}

  ngOnInit(): void {
  }

}
