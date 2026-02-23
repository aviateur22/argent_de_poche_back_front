import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-child-image',
  imports: [NgOptimizedImage],
  templateUrl: './child-image.html',
  styleUrl: './child-image.css',
})
export class ChildImage {
  // L'url d'acces a l'image du compte d'argent de poche
  @Input() childImageUrl!: string;

  // L'image de chargement
  placeholder = "/images/cbasic60.svg";
}
