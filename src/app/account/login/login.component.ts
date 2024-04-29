import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin!: FormGroup;
  submitted = false;
  errorMessages: string[] = [];
  returnUrl: string | null = null;

  constructor(private _serviceA: AccountService, private _fb: FormBuilder, private _redirect: Router,private aroute:ActivatedRoute) {
    this._serviceA.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this._redirect.navigate(['']);
        } else {
          this.aroute.queryParamMap.subscribe({
            next: (params: any) => {
              this.returnUrl = params.get('returnUrl');
            }
          })
        }
      }
    })


    this.formLogin = _fb.group({
      UserName: ['',[Validators.required]],
      Password: ['', [Validators.required]]
    })
  }

  submit() {
    this.submitted = true;


    this._serviceA.login(this.formLogin.value).subscribe({
      next: (response: any) => {
        this._serviceA.user$.subscribe((data) => {
          if (this.returnUrl) {
            this._redirect.navigate([this.returnUrl]);
            Swal.fire({
              icon: 'success',
              title: `Bienvenido ${data?.name} has inicado sesion`,
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          } else {
            if (data) {
              this._redirect.navigate(['/indexTasks']);
              Swal.fire({
                icon: 'success',
                title: `Bienvenido ${data.name} has inicado sesion`,
                allowOutsideClick: false
              }).then((result) => {
                if (result.isConfirmed) {
                  location.reload();
                }
              });
            }

          }
        })
      },
      error: error => {
        console.log(error);
        if (error.error.errors) {
          this.errorMessages = error.error.errors;
        } else {
          /*this.errorMessages.push(error.error.error);*/
          Swal.fire({
            icon: 'error',
            title: `${error.error.error}`
          });
          this.formLogin.reset();
        }
      }
    })
  }

}
