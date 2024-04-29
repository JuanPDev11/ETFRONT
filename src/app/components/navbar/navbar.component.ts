import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { User } from '../../interfaces/User';
import { take } from 'rxjs';
import { RoleService } from '../../services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  token: any;
  constructor(public service: AccountService,private _roleService:RoleService) {
    
  }

  ngOnInit(): void {
    if (this.isLocalStorageAvailable) {
      this.token = this._roleService.getRole();
    }

  }

  logout() {
    this.service.logout();
    Swal.fire({
      icon: 'success',
      title: 'Finish Session',
      allowOutsideClick: false,
    }).then((result) => {
      location.reload();
    })
  }
}
