import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-selector',
  imports: [],
  templateUrl: './theme-selector.html',
  styleUrl: './theme-selector.css',
})
export class ThemeSelector {
  /**
   * Toggle du theme entre dark et light
   */
  toggleTheme() {
    document.documentElement.classList.toggle('dark');
  }
}
