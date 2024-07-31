import { Component } from '@angular/core';
import { MainHeaderComponent } from "./main-header/main-header.component";

@Component({
    selector: 'app-main-component',
    standalone: true,
    templateUrl: './main-component.component.html',
    styleUrl: './main-component.component.scss',
    imports: [MainHeaderComponent]
})
export class MainComponentComponent {

}
