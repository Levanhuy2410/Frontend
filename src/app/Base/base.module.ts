import { dateFormatPipe } from './pipes/date-pipe.pipe';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { GridComponent } from './components';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { StatusPipePipe } from './pipes/status-pipe.pipe';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

// All exported items hear need to declare in public_api.ts
const DECLARED_EXPORTS = [
    GridComponent,
    NotFoundComponent
];

const ENTRY_COMPONENTS = [];

const RELAYED_EXPORTS = [
    CommonModule, TranslateModule, PaginatorModule, TableModule, CheckboxModule, 
    ButtonModule, ConfirmDialogModule, MessageModule, MessagesModule, ToastModule
];

@NgModule({
    declarations: [
        ...DECLARED_EXPORTS,
        NotFoundComponent,
        StatusPipePipe,
        dateFormatPipe
    ],
    providers: [
        ConfirmationService,
        MessageService
    ],
    imports: [
        RouterModule,
        ...RELAYED_EXPORTS
    ],
    exports: [
        ...RELAYED_EXPORTS,
        ...DECLARED_EXPORTS
    ]
})
export class PIMBaseModule {
    static forRoot(): ModuleWithProviders<PIMBaseModule> {
        return {
            ngModule: PIMBaseModule
        };
    }
}
