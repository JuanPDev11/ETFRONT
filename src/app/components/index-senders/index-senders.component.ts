import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TasksServiceService } from '../../services/tasks-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-senders',
  templateUrl: './index-senders.component.html',
  styleUrl: './index-senders.component.scss'
})
export class IndexSendersComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['email', 'serverIMAP', 'serverSMTP', 'portIMAP', 'portSMTP','actions'];
  dataSource = new MatTableDataSource();

  constructor(private _serviceT:TasksServiceService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getSenders();
  }

  getSenders() {
    this._serviceT.getSenders().subscribe({
      next: (data: any) => {
        this.dataSource.data = data.senders;
      }
    })
  }

  deleteSender(id:number) {
    this._serviceT.deleteSender(id).subscribe({
      next: (data: any) => {
        Swal.fire({
          icon: 'success',
          title: data.message
        })
        this.getSenders();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
