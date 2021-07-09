import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/dbmodels/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signed-in',
  templateUrl: './signed-in.component.html',
  styleUrls: ['./signed-in.component.scss']
})
export class SignedInComponent {
  user?: User;
  signedIn?: boolean = false;
  users?: User[];
  signupStuff =() =>{
    this.service.getLogin().subscribe((users)=>{
      this.users=users;
      if (this.users && localStorage.getItem('token')) {
        let user = this.users.find(use=>use.token == localStorage.getItem('token'))
        if(user){
          this.service.getUser(user._id).subscribe((user) => {
            this.user = user;
            console.log(this.user)
            this.signedIn=true;
            console.log(this.router.url)
            if(this.router.url === '/home/user/'){
              console.log('oye')
              this.router.navigateByUrl(`home/user/:id;id=${user?._id}/game`)}
          })
        }
        else{
          this.signedIn=false;
          this.router.navigate(['/home/login'])
        }
      }
    })
  }
  constructor(public router: Router, private service: LoginService) {
    console.log(localStorage.getItem('token'))
    this.signupStuff()
  }
  signout=()=>{
    console.log('signout')
    this.service.signout(this.user)
    this.signedIn=false;
    this.user=undefined;
    this.router.navigate(['/home/login'])
  }
}
