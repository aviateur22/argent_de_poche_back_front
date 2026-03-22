import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ChildMoneyAccount } from '../../../store/model';
import { ManagerComponentContainer } from "../manager-component-container/manager-component-container";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import * as actions from '../../../store/actions';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-manager-child-image',
  imports: [AsyncPipe, ManagerComponentContainer, InputNumberModule, InputTextModule, ButtonModule, FormsModule, ConfirmDialogModule, NgOptimizedImage],
  templateUrl: './manager-child-image.html',
  styleUrl: './manager-child-image.css',
})
export class ManagerChildImage {
  @Input() childMoneyAccount!: ChildMoneyAccount;
  @Input() parentId!: string;
  @Input() title!: string;

  private _store = inject(Store);
  private _imageService = inject(ImageService);

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChildImageUrl();
  }

  /**
   * URL de l'image du compte original
   */
  childImageUrl$: Observable<string> = of('');

  /**
   * URL de la nouvelle image sélectionnée
   * Cette URL est construite à partir de l'objet File newSelectedImageFile
   *
   * @see loadSelectedFile
   *
   */
  newSelectedImageUrl: string | null = null;

  /**
   * L'objet image qui est selectionnée
   */
  private _newSelectedImageFile: File | null = null;

  //  /**
  //   * L'image de chargement
  //   */
  // placeholder = "/images/cbasic60.svg";

  /**
   * Mise à jour de la photo
   */
  updatePhoto(): void {
    if(!this._newSelectedImageFile)
      throw new Error("Impssible de récupérer l'image selectionnée");

    const formData: FormData = new FormData();
        formData.append('image', this._newSelectedImageFile);
        formData.append('parentId', this.parentId);
        formData.append('childAccountId', this.childMoneyAccount.childMoneyAccountId);

    this._store.dispatch(actions.updateChildImageAction({updateChildImageDto: formData}));

  }

  /**
   * Chargement de la nouvelle image selectionnée
   * Cette image sera affichée et remplacera l'image d'origine
   *
   * @param file  La photo choisie
   */
  loadSelectedFile(file: File | undefined): void {

    if(!file)
      return;

    if(!file.type.startsWith('image/'))
      throw new Error("");

    if(this.newSelectedImageUrl)
      URL.revokeObjectURL(this.newSelectedImageUrl);

    // Creation de URL d'accés de l'image
    this.newSelectedImageUrl = URL.createObjectURL(file);

    // Stocke l'image pour update
    this._newSelectedImageFile = file;
  }

  /**
   * Chargement de l'url de l'image du compte
   */
  loadChildImageUrl(): void {
    const childAccountId = this.childMoneyAccount.childMoneyAccountId;
    const childImageName = this.childMoneyAccount.childImageName;

    // Si pas de données sur l'image
    if(!childImageName)
      return;

    this.childImageUrl$ = this._imageService.loadChildImageUrl(childImageName, childAccountId, this.parentId);
  }

}
