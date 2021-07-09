import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DoublePipe } from './pipes/double.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list';
import { LoginComponent } from './pages/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { SignupComponent } from './modals/signup/signup.component';
import { SignedInComponent } from './pages/signed-in/signed-in.component';
import { DragboardComponent } from './tools/dragboard/dragboard.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { ResultsComponent } from './modals/results/results.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DoublePipe,
    LoginComponent,
    SignupComponent,
    SignedInComponent,
    DragboardComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    DragDropModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
