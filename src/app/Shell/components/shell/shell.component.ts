import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'pim-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements OnInit {
  langs: {name: string}[] = [];
  currentLang: {name: string} = {name: 'EN'};

  constructor(private primengConfig: PrimeNGConfig, public translate: TranslateService){
    this.langs = translate.getLangs().map((value) => {
      return {name: value.toLocaleUpperCase()};
    });
  }

  switchLang() {
    this.translate.use(this.currentLang.name.toLocaleLowerCase());
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
