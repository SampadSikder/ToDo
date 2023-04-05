import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {

  }

  password: string = '';
  checkPassword: string = '';
  public isOtpSentSuccessful: boolean = false;
  public isOtpVerified: boolean = false;

  sendOTP(email: string) {
    console.log("click");
    this.authService.sendOtp(email).subscribe((response: any) => {
      alert(response.message);
      this.isOtpSentSuccessful = true;
    });
    // this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
    //   console.log(res);
    //   this.router.navigate(['/login']);
    // });
  }

  onChangePassword(email: string, password: string) {
    this.authService.changePassword(email, password).subscribe((response: any) => {
      this.router.navigate(['/login']);
    });
  }

  onVerifyOtpClicked(email: string, otp: string) {

    this.authService.verifyOtp(email, parseInt(otp)).subscribe((response: any) => {
      if (response.message === 'OTP verified successfully') {
        this.isOtpVerified = true;
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
