import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [
    trigger('slideIn', [
      state('void', style({ transform: 'translateX(100%)' })),
      transition(':enter, :leave', [
        animate('300ms ease-in-out')
      ]),
    ]),
  ]
})
export class SigninComponent implements OnInit, AfterViewInit {
  isLoginSignupFormVisible = false;
  isSignupForm = false;
  loginSignupForm: FormGroup;
  hidePassword = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private formBuilder: FormBuilder, private http: HttpClient
  ) {
    this.loginSignupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*[a-z])/),
        Validators.pattern(/(?=.*[A-Z])/),
        Validators.pattern(/(?=.*\d)/),
        Validators.pattern(/(?=.*[\W_])/)
      ]],
      fullname: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.minLength(3),
        Validators.pattern(/\b\w+\b\s+\b\w+\b\s+\b\w+\b/) // Ensure at least three words
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/) // Assuming a 10-digit phone number
      ]],
      address: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]+$/) // Ensure only letters and spaces
      ]]
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const menubtn = this.renderer.selectRootElement('.menubtn', true);
      const closebtn = this.renderer.selectRootElement('.closebtn', true);
      const menu = this.renderer.selectRootElement('.container__menu', true);

      if (menubtn && closebtn && menu) {
        this.renderer.listen(menubtn, 'click', () => {
          this.renderer.setStyle(menubtn, 'display', 'none');
          this.renderer.setStyle(closebtn, 'display', 'block');
          this.renderer.setStyle(menu, 'display', 'flex');
        });

        this.renderer.listen(closebtn, 'click', () => {
          this.renderer.setStyle(closebtn, 'display', 'none');
          this.renderer.setStyle(menubtn, 'display', 'block');
          this.renderer.setStyle(menu, 'display', 'none');
        });
      }
    }
  }

  toggleLoginSignupForm() {
    this.isLoginSignupFormVisible = !this.isLoginSignupFormVisible;
    this.isSignupForm = false;
  }

  toggleSignupForm() {
    this.isSignupForm = !this.isSignupForm;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  async onSubmit() {
    if (this.isSignupForm) {
      await this.signup();
    } else {
      await this.login();
    }
  }

  async login() {
    const { email, password } = this.loginSignupForm.value;
    try {
      const response = await this.http.post<{ token: string, message: string }>(
        'http://localhost:3000/api/login', 
        { email, password }
      ).toPromise();
      console.log(response.message);
      // Store token and handle login success
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  async signup() {
    const { email, password, fullname, phone, address } = this.loginSignupForm.value;
    try {
      const response = await this.http.post<{ message: string }>(
        'http://localhost:3000/api/signup', 
        { email, password, fullname, phone, address }
      ).toPromise();
      console.log(response.message);
      // Handle signup success
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }

  onCancel() {
    this.loginSignupForm.reset();
    this.isLoginSignupFormVisible = false;
  }

  getValidationMessage(controlName: string): string {
    const control = this.loginSignupForm.get(controlName);
    if (control.errors) {
      if (control.errors.required) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required.`;
      } else if (control.errors.email) {
        return `Invalid email format.`;
      } else if (control.errors.minlength) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${control.errors.minlength.requiredLength} characters long.`;
      } else if (control.errors.pattern) {
        if (controlName === 'password') {
          return `Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.`;
        } else if (controlName === 'phone') {
          return `Phone number must be a 10-digit number.`;
        } else if (controlName === 'address') {
          return `Address must contain only letters and spaces.`;
        }
      }
    }
    return '';
  }
}
