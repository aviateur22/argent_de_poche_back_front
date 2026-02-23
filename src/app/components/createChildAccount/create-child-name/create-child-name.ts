import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-child-name',
  imports: [FormsModule, InputNumberModule , InputTextModule, ButtonModule],
  templateUrl: './create-child-name.html',
  styleUrl: './create-child-name.css',
})
export class CreateChildName {
  /**
   * Le prénom de l'enfant
   */
  @Input() childName:string | null = null;
  @Output() childNameChange = new EventEmitter<string>();

  onNameChange(value: string) {
    this.childNameChange.emit(value);
  }

}
