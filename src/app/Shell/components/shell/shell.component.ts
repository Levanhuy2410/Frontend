import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'pim-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig){

  }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
