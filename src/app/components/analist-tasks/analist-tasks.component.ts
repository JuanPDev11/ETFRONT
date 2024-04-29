import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TasksServiceService } from '../../services/tasks-service.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

@Component({
  selector: 'app-analist-tasks',
  templateUrl: './analist-tasks.component.html',
  styleUrl: './analist-tasks.component.scss'
})
export class AnalistTasksComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['no', 'subject','body','action'];
  dataSource = new MatTableDataSource();

  dataMails: any;
  mails:any;
  tasks: any;
  formSend!: FormGroup;
  ID!: any;
  
  constructor(private _serviceT: TasksServiceService, public dialog: MatDialog, private _route: ActivatedRoute) {
    
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getTasks();
    this.getMails();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  getTasks() {
    
    this._serviceT.getTasksOrder().subscribe({
      next: (data: any) => {
        console.log(data);
        this.tasks = data;
      }
    })
  }

  getMails() {
    this._serviceT.getMails().subscribe({
      next: (data: any) => {
        console.log(data)
        this.dataSource.data = data;
        this.mails = data.length;
        this.dataMails = data;
      }
    })
  }

  details(id:number) {
    let mail;

    for( mail of this.dataMails){
      if (mail.id == id) {
        Swal.fire({
          icon: 'info',
          html: `<strong>From: </strong> ${mail.from} <br>
                 <strong>Subject: </strong> ${mail.subject} <br>`
        })
        break;
      }
    }
  }


  openDialog(taskId:number) {
    
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '70%',  
      height: '70%',
      data: {
        id: taskId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
