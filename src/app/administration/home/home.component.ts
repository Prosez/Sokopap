import { Component, Renderer2, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
items: any;
  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeFilterSelection();
      this.filterSelection('all'); // Show all columns by default
    }
  }

  filterSelection(category: string) {
    const columns = document.getElementsByClassName('column');
    for (let i = 0; i < columns.length; i++) {
      this.removeClass(columns[i], 'show');
      if (category === 'all' || columns[i].className.indexOf(category) > -1) {
        this.addClass(columns[i], 'show');
      }
    }
  }

  addClass(element: Element, name: string) {
    const arr1 = element.className.split(' ');
    const arr2 = name.split(' ');
    for (let i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += ' ' + arr2[i];
      }
    }
  }

  removeClass(element: Element, name: string) {
    let arr1 = element.className.split(' ');
    const arr2 = name.split(' ');
    for (let i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(' ');
  }

  initializeFilterSelection() {
    const btnContainer = document.getElementById('myBtnContainer');
    if (btnContainer) {
      const btns = btnContainer.getElementsByClassName('btn');
      for (let i = 0; i < btns.length; i++) {
        this.renderer.listen(btns[i], 'click', (event) => {
          const current = document.getElementsByClassName('active');
          if (current.length > 0) {
            current[0].className = current[0].className.replace(' active', '');
          }
          (event.target as HTMLElement).className += ' active';
        });
      }
    }
  }
}
