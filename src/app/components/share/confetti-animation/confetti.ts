import { Component, inject, OnInit } from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-confetti',
  imports: [],
  templateUrl: './confetti.html',
  styleUrl: './confetti.css',
})
export class Confetti implements OnInit {

  ngOnInit(): void {
    this.displayConfetti();
  }

  /**
   * Animation de confetti qui sera répété pendant 10 seconde
   */
  displayConfetti() {

    /**
     * 10 seconde d'animation
     */
    var duration = 10 * 1000;
    var end = Date.now() + duration;

    /**
     * Fonction
     */
    const frame = () => {
      confetti({
        particleCount: 2,
        spread: 360,
        startVelocity: 20,
        origin: {
          y:0.0,
          x:0.5
        }
      });

      if(Date.now() < end)
        requestAnimationFrame(frame);
    }

     frame();
  }
}
