import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/dbmodels/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  users?: User[]
  user?: User

 
  ngOnInit(){
    if(this.router.url =="/home/"){
      this.service.getLogin().subscribe((users) => {
        this.users = users;
        if (this.users && localStorage.getItem('token')) {
          let user = this.users.find(use => use.token == localStorage.getItem('token'))
          if (user) {
            this.router.navigate(['home/user/:id', { id: user?._id }])
          }
        }
        else {
          this.router.navigate(['/home/login'])
        }
      })
    }
  }
  constructor(private service: LoginService, public router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 100px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    //console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('token'))
  }
}

