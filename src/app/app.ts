import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoadingOverlay } from "./components/share/loading-overlay/loading-overlay";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, LoadingOverlay],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('argent-de-poche');
}
