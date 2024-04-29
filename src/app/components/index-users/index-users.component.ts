import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TasksServiceService } from '../../services/tasks-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-users',
  templateUrl: './index-users.component.html',
  styleUrl: './index-users.component.scss'
})
export class IndexUsersComponent {
  displayedColumns: string[] = ['name', 'email', 'roles', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(private _serviceT: TasksServiceService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._serviceT.getUsers(undefined).subscribe({
      next: (data: any) => {
        console.log(data);
        this.dataSource.data = data;
        
      }
    })
  }

  deleteUser(id:string) {
    this._serviceT.deleteUser(id).subscribe({
      next: (data: any) => {
        this.getUsers();
        Swal.fire({
          icon: 'success',
          title: data.message
        })
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
