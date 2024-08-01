import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-activate-user-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activate-user-info.component.html',
  styleUrl: './activate-user-info.component.scss'
})
export class ActivateUserInfoComponent {
  sharedService = inject(SharedService);
}
