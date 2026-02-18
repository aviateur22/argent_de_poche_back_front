import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manager-component-container',
  imports: [],
  templateUrl: './manager-component-container.html',
  styleUrl: './manager-component-container.css',
})
export class ManagerComponentContainer {
  // Le titre a afficher sur le composant
  @Input() title!: string;
}
