import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formRegister!: FormGroup;
  submitted = false;
  errorMessages: string[] = [];

  constructor(private _fb: FormBuilder, private _serviceA: AccountService) {
    this.formRegister = _fb.group({
      Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      Email: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      Password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]]
    })
  }

  submit() {
    this.submitted = true;

    this._serviceA.register(this.formRegister.value).subscribe({
      next: (response) => {
        console.log(response);
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
          this.formRegister.reset();
        }
      }
    })
  }

}
