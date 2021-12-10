import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PIMBaseModule } from '../Base/base.module';
import { ShellComponent } from './components/shell/shell.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

@NgModule({
    declarations: [
        ShellComponent,
        SideNavComponent
    ],
    imports: [
        RouterModule,
        PIMBaseModule
    ]
})
export class ShellModule {

}
