
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe(
      (res: HttpResponse<any>) => {
        if (res.status === 200) {
          // we have logged in successfully
          this.router.navigate(['/task-view']);
        }
      },
      (error) => {
        // show an alert indicating that there was an error
        window.alert('Incorrect password. Please try again.');
      }
    );
  }

}