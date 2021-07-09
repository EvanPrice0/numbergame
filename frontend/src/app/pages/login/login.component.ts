import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/dbmodels/user';
import { SignupComponent } from 'src/app/modals/signup/signup.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  users?: User[];
  user?: User;
  constructor(private login: LoginService, public fb: FormBuilder, public dialog: MatDialog, public router: Router) {
    this.login.getLogin().subscribe((user) => {
      this.users = user;
      console.log('users',this.users)
      if (this.users && localStorage.getItem('token')) {
        let user = this.users.find(use=>use.token == localStorage.getItem('token'))
        if(user){
          this.router.navigate(['home/user/:id', {id: user?._id}])
        }
      }
    })
  }
  profileForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  onSubmit = (form?: FormGroup) => {
    let user1 = this.users?.find(nam => nam.email == form!.value.email);
    if (user1 != undefined) {
      user1.email = form!.value.email
      user1.password = form!.value.password
      console.log('user',user1)
      this.login.setLogin(user1).subscribe((user: User) => {
        console.log('token',user['updateduser']['token'])
        localStorage.setItem('token', user['updateduser']['token'])
        this.router.navigate(['home/user/:id', {id: user1?._id}])
      })
    }
  }
  openDialog() {
    let dialogRef = this.dialog.open(SignupComponent);
    dialogRef.afterClosed().subscribe((result?: User) => {
      if (result) {
        this.login.setSignup(result).subscribe((data) => {
          console.log('data', data)
        })
      }
    });
  }
}
