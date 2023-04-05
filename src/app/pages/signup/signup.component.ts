import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  password: string = '';
  checkPassword: string = '';
  public isRegistrationSuccessful: boolean = false;
  onSignupButtonClicked(email: string) {
    console.log("click");
    this.isRegistrationSuccessful = true;
    this.authService.sendOtp(email).subscribe((response: any) => {
      alert(response.message);
    });
    // this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
    //   console.log(res);
    //   this.router.navigate(['/login']);
    // });
  }
  onVerifyOtpClicked(email: string, password: string, otp: string) {

    this.authService.verifyOtp(email, parseInt(otp)).subscribe((response: any) => {
      if (response.message === 'OTP verified successfully') {
        this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.router.navigate(['/login']);
        });
      } else {
        alert('Invalid OTP!');
      }
    });
  }
  isValidPassword(): boolean {
    return this.password.length >= 6;
  }

  isMatchingPasswords(): boolean {
    return this.password === this.checkPassword;
  }

}
