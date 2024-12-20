import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  // Hier müssen Sie die benötigten Module angeben
  imports: [
    RouterLink,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public title: string = 'Stay Active, Stay Together';
  public imagePath: string = "./../assets/images/sport.jpeg";
}
