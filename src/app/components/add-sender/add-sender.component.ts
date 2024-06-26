import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksServiceService } from '../../services/tasks-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-sender',
  templateUrl: './add-sender.component.html',
  styleUrl: './add-sender.component.scss'
})
export class AddSenderComponent {
  formSender!: FormGroup;
  submitted = false;
  errorMessages: string[] = [];
  ID: any;
  isDisable = false;



  constructor(private _fb: FormBuilder, private _serviceA: AccountService, private _redirect: Router,
    private _route: ActivatedRoute, private _serviceT: TasksServiceService) {

  }

  ngOnInit(): void {
    this.ID = Number(this._route.snapshot.paramMap.get("id"));
    console.log(this.ID);
    
    this.formSender = this._fb.group({
      Email: ['', [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      PortIMAP: ['', [Validators.required]],
      PortSMTP: ['', [Validators.required]],
      ServerIMAP: ['', [Validators.required]],
      ServerSMTP: ['', [Validators.required]],
    })

    if (this.ID > 0) {
      this.getSender(this.ID);
    }
  }

  getSender(id: number) {
    this._serviceT.getSenders(id).subscribe({
      next: (data: any) => {
        this.formSender.patchValue({
          Email: data.sender.email ,
          Password: data.sender.password ,
          PortIMAP: data.sender.portIMAP,
          PortSMTP: data.sender.portSMTP,
          ServerIMAP: data.sender.serverIMAP,
          ServerSMTP: data.sender.serverSMTP,
        })
        console.log(data);
      }
    })
  }

  submit() {
    this.submitted = true;

    if (this.ID > 0) {
      let formData = new FormData();
      formData.append('email', this.formSender.get("Email")!.value);
      formData.append('password', this.formSender.get("Password")!.value);
      formData.append('portIMAP', this.formSender.get("PortIMAP")!.value);
      formData.append('portSMTP', this.formSender.get("PortSMTP")!.value);
      formData.append('serverIMAP', this.formSender.get("ServerIMAP")!.value);
      formData.append('serverSMTP', this.formSender.get("ServerSMTP")!.value);


      this._serviceT.postSender(this.ID, formData).subscribe({
        next: (response: any) => {
          console.log(response);
          this._redirect.navigateByUrl("/indexSenders")
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
      let formData = new FormData();

      formData.append('email', this.formSender.get("Email")!.value);
      formData.append('password', this.formSender.get("Password")!.value);
      formData.append('portIMAP', this.formSender.get("PortIMAP")!.value);
      formData.append('portSMTP', this.formSender.get("PortSMTP")!.value);
      formData.append('serverIMAP', this.formSender.get("ServerIMAP")!.value);
      formData.append('serverSMTP', this.formSender.get("ServerSMTP")!.value);

      this._serviceT.postSender(undefined,formData).subscribe({
        next: (response: any) => {
          console.log(response);
          this._redirect.navigateByUrl("/indexSenders")
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
