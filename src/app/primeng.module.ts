import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    MenubarModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ProgressSpinnerModule,
    MessageModule,
    MessagesModule,
    TieredMenuModule,
    ChartModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule,
  ],
  exports: [
    MenubarModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ProgressSpinnerModule,
    MessageModule,
    MessagesModule,
    TieredMenuModule,
    ChartModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule
  ]
})
export class PrimeNgModule {}

