import { Component, Inject, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('slideIn', [
      state('void', style({ transform: 'translateY(-100%)' })),
      state('*', style({ transform: 'translateY(0)' })),
      transition(':enter', animate('500ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent implements AfterViewInit {
  isLoginSignupFormVisible = false;
  isSignupForm = false;
  loginSignupForm: FormGroup;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private router: Router,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth
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
        Validators.pattern(/\b\w+\b\s+\b\w+\b\s+\b\w+\b/)  // Ensure at least three words
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
        } else if (controlName === 'fullname') {
          return `Full name must contain at least three words and only letters and spaces.`;
        } else if (controlName === 'address') {
          return `Address must contain only letters and spaces.`;
        }
      }
    }
    return '';
  }

  toggleLoginSignupForm() {
    this.isLoginSignupFormVisible = !this.isLoginSignupFormVisible;
    this.isSignupForm = false;
  }

  toggleSignupForm() {
    this.isSignupForm = !this.isSignupForm;
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
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Login successful');
      this.onCancel(); 
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  async signup() {
    const { email, password } = this.loginSignupForm.value;
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('Signup successful');
      this.onCancel(); 
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }

  onCancel() {
    this.loginSignupForm.reset();
    this.isLoginSignupFormVisible = false;
  }

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
}
