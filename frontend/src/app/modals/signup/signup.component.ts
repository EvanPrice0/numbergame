import { Component, Inject, Injector, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/dbmodels/user';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user?: User;
  
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirm = group.get('confirm')?.value
    return pass === confirm ? null : { notSame: true }
  }

  signupForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirm: ['']}, 
    { validators: this.checkPasswords })

  constructor(private login: LoginService, private fb: FormBuilder,private dialogRef: MatDialogRef<SignupComponent>){

   }
   onSubmit=(form: FormGroup)=>{
    let user = new User();
    user.email=form.value.email
    user.password=form.value.password
    this.dialogRef.close(user)
   }  
}
