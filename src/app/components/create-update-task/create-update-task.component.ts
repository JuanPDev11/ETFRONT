import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { TasksServiceService } from '../../services/tasks-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-update-task',
  templateUrl: './create-update-task.component.html',
  styleUrl: './create-update-task.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class CreateUpdateTaskComponent implements OnInit{
  email = new FormControl('', [Validators.required, Validators.email]);
  formTask!: FormGroup;
  errorMessage = '';
  

  senders: any;
  periods: string[] = ["day", "week", "month"];
  ID!: number;

  constructor(private _serviceT: TasksServiceService, private _fb: FormBuilder, private _route: ActivatedRoute, private _datePipe: DatePipe,
    private _redirect: Router) {
    this.ID = Number(_route.snapshot.paramMap.get("id"));
   

    this.formTask = _fb.group({
      name: [''],
      periodicity: [''],
      date: [{ value: '', disabled: true }],
      hour: [''],
      addressee: [''],
      sender:['']
    })


    this.formTask.get('periodicity')?.valueChanges.subscribe(value => {
      const dateControl = this.formTask.get('date');
      if (value === this.periods[0]) {
        dateControl?.disable();
      } else {
        dateControl?.enable();
      }
    })

  }

  ngOnInit(): void {
    console.log(this.ID);
    this.getSenders();
  }

  getSenders() {
    if (this.ID) {
      this._serviceT.getSenders(this.ID).subscribe({
        next: (data: any) => {
          console.log(data.taskUnit.hour);
          this.senders = data.senders;
          this.formTask.patchValue({
            name: data.taskUnit.name,
            periodicity: data.taskUnit.periodicity,
            date: data.taskUnit.dateSender,
            hour: data.taskUnit.hour.slice(0,5),
            addressee: data.taskUnit.addressee,
            sender: data.taskUnit.senderId
          })
        }
      })
    } else {
      this._serviceT.getSenders(this.ID).subscribe({
        next: (data: any) => {
          this.senders = data.senders;
        }
      })
    }
    
  }

  onChange() {
    this.updateErrorMessage()
  }

  

  updateErrorMessage() {
    if (this.formTask.get('addressee')?.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.formTask.get('addressee')?.hasError('pattern')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  submit() {
    var form = new FormData();
    let formatDate = this._datePipe.transform(this.formTask.get('date')?.value, 'yyyy-MM-dd');
    form.append('name', this.formTask.get('name')?.value);
    form.append('periodicity', this.formTask.get('periodicity')?.value);
    form.append('date', formatDate!);
    form.append('hour', this.formTask.get('hour')?.value);
    form.append('addressee', this.formTask.get('addressee')?.value);
    form.append('sender', this.formTask.get('sender')?.value);

    if (this.ID) {
      this._serviceT.postTask(form, this.ID).subscribe({
        next: (data: any) => {
          this._redirect.navigateByUrl("/indexTasks")
          Swal.fire({
            icon: 'success',
            title: data.message
          })
        }
      })
    } else {
      this._serviceT.postTask(form).subscribe({
        next: (data: any) => {
          this._redirect.navigateByUrl("/indexTasks")
          Swal.fire({
            icon: 'success',
            title: data.message
          })
        }
      })
    }
    
    
  }
}
