import { Component, HostListener, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import * as $ from 'jquery';
import {Location, PopStateEvent} from '@angular/common';
import {filter} from 'rxjs/operators';
import {FlashService} from "../../service/flash.service";
import {FlashTerrain} from "../../models/FlashTerrain";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(public location: Location, private router: Router) {
  }

  ngOnInit(): void {
    this.navBar();
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    this.navBar();
  }
  navBar() {
    var header = document.getElementById('header');
    if (window.pageYOffset > 1) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
      header.classList.add('sticky1');
    }
  }
  ngAfterViewInit() {
    this.runOnRouteChange();
  }

  isMaps(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    } else {
      return true;
    }
  }

  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

}
