import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TasksServiceService } from '../../services/tasks-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.scss'
})
export class DialogContentComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef;

  formSend!: FormGroup;
  file1!: File | undefined;
  file2!: File | undefined;
  file3!: File | undefined;
  isFile = false;
  namesFiles:string[]=[];

  constructor(private _serviceT: TasksServiceService, private _fb: FormBuilder, public dialogRef: MatDialogRef<DialogContentComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any, private _router: Router) {
    this.formSend = _fb.group({
      sender: [{value:'',disabled:true}],
      addressee: [{ value: '', disabled: true }],
      subject: [''],
      body: ['']
    })
    console.log(this.file1);
    
  }

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    console.log(this.data.id);
    if (this.data.id > 0) {
      this._serviceT.getTask(this.data.id).subscribe({
        next: (data: any) => {
          this.formSend.patchValue({
            sender: data.sender.email,
            addressee: data.addressee
          })
        }
      })
    }
  }
  

  submit() {
    console.log('From Submit');
    const form = new FormData();
    form.append('id', this.data.id);
    form.append('sender', this.formSend.get('sender')!.value);
    form.append('addressee', this.formSend.get('addressee')!.value);
    form.append('subject', this.formSend.get('subject')!.value);
    form.append('body', this.formSend.get('body')!.value);
    //for (let i = 0; i < this.file.length; i++) {
    //  form.append('file'+i, this.file[i]);
    //}
    form.append('File1', this.file1!);
    form.append('File2', this.file2!);
    form.append('File3', this.file3!);

    console.log(form.get("id"));
 
    this._serviceT.sendEmail(form).subscribe({
      next: (data: any) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          text: 'Email send Succesfully',
          allowOutsideClick: false,
          showConfirmButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        })
      },
      error: error => {
        console.log(error);
      }
    })
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  getFile(event: any) {
    
    for (let i = 1; i < 4; i++) {
      if (this.file1 == undefined) {
        this.file1 = event.target.files[0];
        this.namesFiles.push(event.target.files[0].name);
        break;
      } else if (this.file2 == undefined) {
        this.file2 = event.target.files[0];
        this.namesFiles.push(event.target.files[0].name);
        break;
      } else if (this.file3 == undefined) {
        this.file3 = event.target.files[0];
        this.namesFiles.push(event.target.files[0].name);
        break;
      } else {
        Swal.fire({
          title: 'Oops..',
          icon: 'error',
          text:'Maximun 3 files'
        })
      }
    }
    

    
    this.isFile = true
  }

  deleteFile(file: string) {
    if (this.namesFiles.length < 1) {
      this.isFile = false;
    }

    this.namesFiles = this.namesFiles.filter(name => name !== file);

    switch (file) {
      case this.file1?.name:
        this.file1 = undefined;
        break;
      case this.file2?.name:
        this.file2 = undefined;
        break;
      case this.file3?.name:
        this.file3 = undefined;
        break;
      default:
        console.log("Nada que borrar")
    }
    
    this.fileInput.nativeElement.value = '';
    console.log(this.namesFiles);
    console.log(this.file1);
    console.log(this.file2);
    console.log(this.file3);
  }

}
