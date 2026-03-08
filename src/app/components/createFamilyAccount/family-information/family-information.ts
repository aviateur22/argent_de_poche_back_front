import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule} from 'primeng/message';
import { CreateFamilyAccountDto } from '../../../models/family-account.dto';
import { Store } from '@ngrx/store';
import * as actions from '../../../store/actions';
import { Router } from '@angular/router';
import pageUrl from '../../../../misc/page-url';
import { Link } from "../../share/link/link";

@Component({
  selector: 'app-family-information',
  imports: [FormsModule, ReactiveFormsModule, InputNumberModule, InputTextModule, ButtonModule, MessageModule, Link],
  templateUrl: './family-information.html',
  styleUrl: './family-information.css',
})
export class FamilyInformation {

  private _fb = inject(FormBuilder);
  private _store = inject(Store);
  private _router = inject(Router);

  familyFb = this._fb.group({
    familyName: ['', Validators.required],
    parentName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  /**
   * Création d'un compte familiale
   */
  createFamilyAccount() {
    if(!this.familyFb.valid || this.familyFb == null) {
      this.familyFb.markAllAsTouched();
      return;
    }

    const dto: CreateFamilyAccountDto = {
      email: this.familyFb.get('email')?.value!,
      password: this.familyFb.get('password')?.value!,
      familyName: this.familyFb.get('familyName')?.value!,
      parentName: this.familyFb.get('parentName')?.value!
    }

    this._store.dispatch(actions.createFamilyAccountAction({ createFamilyAccountDto: dto }));

  }

  /**
   * Redirection page login
   */
  redirectToLoginPage() {
      this._router.navigate([pageUrl.login.url]);
  }
}
