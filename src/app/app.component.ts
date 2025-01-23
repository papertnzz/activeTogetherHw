import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';                  
import { HeaderComponent } from './header/header.component';
import { BackendService } from './shared/backend.service';
import { StoreService } from './shared/store.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,                                  
    HeaderComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private backendService: BackendService,
    public storeService: StoreService
  ) {}

  ngOnInit() {
    
    this.backendService.getCourses();
    this.backendService.getRegistrations(this.storeService.currentPage);
  }
}
