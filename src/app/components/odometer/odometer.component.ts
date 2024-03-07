// odometer.component.ts
import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-odometer',
  templateUrl: './odometer.component.html',
  styleUrls: ['./odometer.component.css'],
})
export class OdometerComponent implements OnInit, OnChanges {
  @Input() endValue: number = 0; // Value to which the odometer will animate
  @Input() animationDuration: number = 1000; // Duration of the animation in milliseconds
  currentValue: number = 0; // Initialize with some default value
  stepSize: number = 1; // Step size for each animation frame
  animationInterval: any; // Interval reference for animation

  constructor() {}

  ngOnInit(): void {
    this.animateToValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['endValue'] && !changes['endValue'].firstChange) {
      this.animateToValue();
    }
  }

  animateToValue(): void {
    const totalSteps =
      Math.abs(this.endValue - this.currentValue) / this.stepSize;
    const stepDuration = this.animationDuration / totalSteps;
    const increment =
      this.endValue > this.currentValue ? this.stepSize : -this.stepSize;

    this.animationInterval = interval(stepDuration)
      .pipe(take(totalSteps))
      .subscribe(() => {
        this.currentValue += increment;
      });
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      this.animationInterval.unsubscribe();
    }
  }
}
