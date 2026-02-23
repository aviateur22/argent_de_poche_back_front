import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [NgOptimizedImage],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {

}
