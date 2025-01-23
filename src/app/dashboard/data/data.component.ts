import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { Registration } from '../../shared/Interfaces/Registration';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  public page: number = 0;
  public sortAsc: boolean = true; 

  constructor(
    public storeService: StoreService,
    private backendService: BackendService
  ) {}

  selectPage(i: number) {
    this.storeService.currentPage = i;
    this.backendService.getRegistrations(i);
  }

  
  public returnAllPages() {
    const pagesCount = Math.ceil(this.storeService.registrationTotalCount / 2);
    let res = [];
    for (let i = 0; i < pagesCount; i++) {
      res.push(i + 1);
    }
    return res;
  }

  
  toggleSortByDate() {
    this.sortAsc = !this.sortAsc;
    this.sortRegistrations();
  }

  private sortRegistrations() {
    this.storeService.registrations.sort((a, b) => {
      const dateA = a.registrationDate ? new Date(a.registrationDate).getTime() : 0;
      const dateB = b.registrationDate ? new Date(b.registrationDate).getTime() : 0;
      return this.sortAsc ? (dateA - dateB) : (dateB - dateA);
    });
  }

  
  onDeleteRegistration(reg: Registration) {
    reg.isDeleting = true; 

    this.backendService.deleteRegistration(reg.id).subscribe({
      next: () => {
        
        this.backendService.getRegistrations(this.storeService.currentPage);
      },
      error: (err) => {
        console.error('Fehler beim Löschen', err);
        reg.isDeleting = false; 
      }
    });
  }
}
