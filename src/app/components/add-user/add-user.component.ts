import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksServiceService } from '../../services/tasks-service.service';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
  formUser!: FormGroup;
  submitted = false;
  errorMessages: string[] = [];
  ID: any;
  isDisable = false;



  constructor(private _fb: FormBuilder, private _serviceA: AccountService, private _redirect: Router,
    private _route: ActivatedRoute, private _serviceT: TasksServiceService) {

  

    
  }

  ngOnInit(): void {
    this.ID = this._route.snapshot.paramMap.get("id");
    console.log(typeof this.ID);
    if (this.ID != undefined) {
      this.isDisable = true;
    }

    this.formUser = this._fb.group({
      Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      Email: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      Password: [{ value: '', disabled: this.isDisable }, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      Role: ['']
    })

    if (this.ID != undefined) {
      this.getUser(this.ID);
    }
  }

  getUser(id:string) {
    this._serviceT.getUsers(id).subscribe({
      next: (data: any) => {
        this.formUser.patchValue({
          Name: data.name,
          Email: data.email,
          Password: data.passwordHash,
          Role: data.roles[0]
        })
        console.log(data);
      }
    })
  }

  submit() {
    this.submitted = true;

    if (this.ID != undefined) {
      let formData = new FormData();
      formData.append('name', this.formUser.get("Name")!.value);
      formData.append('email', this.formUser.get("Email")!.value);
      formData.append('role', this.formUser.get("Role")!.value);


      this._serviceT.updateUser(this.ID, formData).subscribe({
        next: (response:any) => {
          console.log(response);
          this._redirect.navigateByUrl("/indexUsers")
          Swal.fire({
            icon: 'success',
            title: response.message
          })
        },
        error: error => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors
          }
        }
      })
    } else {
      this._serviceA.register(this.formUser.value).subscribe({
        next: (response:any) => {
          console.log(response);
          this._redirect.navigateByUrl("/indexUsers");
          Swal.fire({
            icon: 'success',
            title: response.message
          })
        },
        error: error => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors
          }
        }
      })
    }

    
  }
}
