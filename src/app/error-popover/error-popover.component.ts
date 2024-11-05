import { Component } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { Subscription, timer } from 'rxjs';
import { NgIf } from '@angular/common';
import { OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-error-popover',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './error-popover.component.html',
  styleUrl: './error-popover.component.scss'
})
export class ErrorPopoverComponent implements OnInit, OnDestroy {
  errorMessage: string | null = null;
  private errorSubscription: Subscription | undefined;

  constructor(private errorService: ErrorService) {}

  ngOnInit() {
    this.errorSubscription = this.errorService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
      timer(5000).subscribe(() => this.errorMessage = null);
    });
  }

  ngOnDestroy() {
    this.errorSubscription?.unsubscribe();
  }
}
