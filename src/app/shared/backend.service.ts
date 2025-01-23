import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Course } from './Interfaces/Course';
import { Registration } from './Interfaces/Registration';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private storeService: StoreService) { }

  public getCourses() {
    this.http
      .get<Course[]>('http://localhost:5000/courses?_expand=eventLocation')
      .subscribe(data => {
        this.storeService.courses = data;
        this.storeService.cousesLoading = false;
      });
  }

  public getRegistrations(page: number) {
    const options = {
      observe: 'response' as const,
      transferCache: {
        includeHeaders: ['X-Total-Count']
      }
    };
    this.http
      .get<Registration[]>(`http://localhost:5000/registrations?_expand=course&_page=${page}&_limit=2`, options)
      .subscribe(resp => {
        this.storeService.registrations = resp.body || [];
        this.storeService.registrationTotalCount = Number(resp.headers.get('X-Total-Count'));
        this.storeService.registrationsLoading = false;
      });
  }

  public addRegistration(registration: any, page: number) {
    return this.http.post('http://localhost:5000/registrations', registration);
  }

  public deleteRegistration(registrationId: number) {
    return this.http.delete(`http://localhost:5000/registrations/${registrationId}`);
  }
}
