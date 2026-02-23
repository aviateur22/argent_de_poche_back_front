import { Component } from '@angular/core';
import { MainContainer } from "../../share/main-container/main-container";
import { FamilyInformation } from "../family-information/family-information";

@Component({
  selector: 'app-create-family-account-page',
  imports: [MainContainer, FamilyInformation],
  templateUrl: './create-family-account-page.html',
  styleUrl: './create-family-account-page.css',
})
export class CreateFamilyAccountPage {

}
