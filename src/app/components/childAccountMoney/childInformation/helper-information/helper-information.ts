import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IconAnimation } from "../../../share/icon-animation/icon-animation";

@Component({
  selector: 'app-helper-information',
  imports: [IconAnimation],
  templateUrl: './helper-information.html',
  styleUrl: './helper-information.css',
})
export class HelperInformation implements OnInit {

  // Permet de faire apparaitre ou dispariatre l'aide à l'écran
  isHelperInformationVisible = signal(false);

  ngOnInit(): void {
    this.display();
  }

  /**
   * Affichage de l'aide une fois que la page est chargée
   */
  display() {
    setTimeout(()=> this.isHelperInformationVisible.set(true), 3000);
  }

  /**
   * Ferme l'aide
   */
  close() {
    this.isHelperInformationVisible.set(false);
  }
}
