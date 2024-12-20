import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';

declare var bootstrap: any; // Falls Sie die globale Bootstrap Variable nutzen

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    SharedModule
  ],
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit, AfterViewInit {
  public registrationForm: any;

  @ViewChild('successToast', { static: true }) successToastEl!: ElementRef;
  private successToast: any;

  constructor(
    private formbuilder: FormBuilder,
    public storeService: StoreService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      courseId: ['', Validators.required],
      birthdate: [
        null,
        [
          Validators.required,
          Validators.min(new Date('1900-01-01').getTime()),
          Validators.max(new Date().getTime())
        ]
      ],
      newsletter: [false]
    });
  }
  

  ngAfterViewInit(): void {
    
    this.successToast = new bootstrap.Toast(this.successToastEl.nativeElement, { delay: 3000 });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.backendService.addRegistration(this.registrationForm.value, this.storeService.currentPage)
        .subscribe({
          next: () => {
            this.backendService.getRegistrations(this.storeService.currentPage);
            
            this.successToast.show();
          },
          error: (err) => console.error(err)
        });
    }
  }
}
