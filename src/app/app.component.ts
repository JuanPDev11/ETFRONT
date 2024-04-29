import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  public isLocalStorageAvailable!: boolean;

  constructor(private _serviceA: AccountService) { }

  ngOnInit(): void {
    this.isLocalStorageAvailable = this.checkLocalStorage();
    if (this.isLocalStorageAvailable) {
      this.RefreshUser();
    }
  }

  private RefreshUser() {
    const jwt = this._serviceA.getJWT();
    if (jwt) {
      this._serviceA.refreshUser(jwt).subscribe({
        next: _ => { },
        error: _ => {
          this._serviceA.logout();
        }
      })
    } else {
      this._serviceA.refreshUser(null).subscribe();
    }
  }

  checkLocalStorage() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

}
