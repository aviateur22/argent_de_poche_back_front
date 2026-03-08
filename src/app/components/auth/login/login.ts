import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MainContainer } from "../../share/main-container/main-container";
import { LoginDto } from '../../../models/auth.dto';
import { loginAction } from '../../../store/actions';
import { Router } from '@angular/router';
import pageUrl from '../../../../misc/page-url';
import { Link } from "../../share/link/link";

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, InputNumberModule, InputTextModule, ButtonModule, MessageModule, MainContainer, Link],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private _fb = inject(FormBuilder);
  private _store = inject(Store);
  private _router = inject(Router);

  // URL de redirection creation de compte
  urlCreateAccountLink = pageUrl.createFamilyAccount.url;

  connexionFb = this._fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  /**
   * Connexion au compte familiale
   */
  loginToFamilyAccount(): void {

    if(!this.connexionFb.valid || this.connexionFb == null) {
      this.connexionFb.markAllAsTouched();
      return;
    }
    const loginDto: LoginDto = {
      email: this.connexionFb.get('email')?.value!,
      password: this.connexionFb.get('password')?.value!,
    }

    this._store.dispatch(loginAction({ loginDto }));
  }

  /**
   * Redirection vers page de creation d'un compte familliale
   */
  redirectToCreateFamilyPage() {
    this._router.navigate([pageUrl.createFamilyAccount.url]);
  }

}
