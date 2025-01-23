import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';


declare var bootstrap: any;

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
})
export class AddDataComponent implements OnInit, AfterViewInit {
  public registrationForm!: FormGroup;

  @ViewChild('successToast', { static: true }) successToastEl!: ElementRef;
  private successToast: any;

  public successMessage: string = 'Der Kurs wurde erfolgreich gebucht!';

  constructor(
    private fb: FormBuilder,
    public storeService: StoreService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    
    this.registrationForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      ],
      birthdate: [
        '',
        [
          Validators.required,
          Validators.min(new Date('1900-01-01').getTime()),
          Validators.max(new Date().getTime()),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      newsletter: [false],
      courseId: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.successToast = new bootstrap.Toast(this.successToastEl.nativeElement, {
      delay: 5000, 
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      
      const formValue = this.registrationForm.value;
      const selectedCourse = this.storeService.courses.find(
        (c) => c.id == formValue.courseId
      );

      const newRegistration = {
        ...formValue,
        registrationDate: new Date().toISOString(), 
      };

      this.backendService
        .addRegistration(newRegistration, this.storeService.currentPage)
        .subscribe({
          next: () => {
            
            this.successMessage = selectedCourse
              ? `Erfolgreich für Kurs "${selectedCourse.name}" angemeldet!`
              : 'Erfolgreich angemeldet!';

            this.backendService.getRegistrations(this.storeService.currentPage);
            this.successToast.show();
            this.registrationForm.reset();
          },
          error: (err) => console.error(err),
        });
    }
  }
}
