import { Component, Inject, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
    private formBuilder: FormBuilder
  ) {
    this.loginSignupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fullname: [''],
      phone: [''],
      address: ['']
    });
  }

  toggleLoginSignupForm() {
    this.isLoginSignupFormVisible = !this.isLoginSignupFormVisible;
    this.isSignupForm = false;
  }

  toggleSignupForm() {
    this.isSignupForm = !this.isSignupForm;
  }

  navigateToPage(page: string): void {
    if (this.isLoginSignupFormVisible) {
      this.toggleLoginSignupForm();
    }
    switch (page) {
      case 'Sellers':
        break;
      case 'transport':
        break;
      case 'buyers':
        break;
      case 'support':
        break;
    }
  }

  onSubmit() {
    if (this.isSignupForm) {
      console.log('Signup form submitted:', this.loginSignupForm.value);
    } else {
      console.log('Login form submitted:', this.loginSignupForm.value);
    }
  }

  onCancel() {
    this.loginSignupForm.reset();
    this.toggleLoginSignupForm();
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
