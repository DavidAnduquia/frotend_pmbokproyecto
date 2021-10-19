import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialog:MatDialog) { }

  ngOnInit(): void {
  }

// Sin usar directamente de esta clase ... DialogComponent
  public abrirModal(nameError:String,titleModule:String){
    this.dialog.open(DialogComponent, { data : { typeError : nameError, title:titleModule}});
  }


}
