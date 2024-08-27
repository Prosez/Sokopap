import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  isHomeVisible = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private router: Router
  ) {}

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
    console.log(this.router.url)
    this.router.navigate(['/admin/signin'])
    }

  navigateToHome(): void {
    console.log(this.router.url); // Logs the current URL for debugging
    this.router.navigate(['/admin/home']); // Navigate relative to the current route
  }

  toggleAboutForm() {
    // Logic to toggle the About form goes here
  }

  toggleContactForm() {
    // Logic to toggle the Contact form goes here
  }
}
