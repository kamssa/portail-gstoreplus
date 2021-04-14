import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaChange, MediaObserver} from "@angular/flex-layout";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, AfterViewInit, OnDestroy{
  title = 'gstoreplusimmobilier';
  private mediaSub: Subscription;
  constructor( private cdRef: ChangeDetectorRef, private mediaObserver: MediaObserver) {
  }
  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        console.log(change.mqAlias);
        console.log(change.mediaQuery);
      }
    );
  }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    if (this.mediaSub){
      this.mediaSub.unsubscribe();
    }
  }

}
