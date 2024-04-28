import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HttpClientModule } from '@angular/common/http';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    SidebarModule,
    DialogModule,
    ToastModule,
    PaginatorModule,
    CardModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    ProgressSpinnerModule,
    HttpClientModule,
    TagModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ButtonModule,
    TableModule,
    SidebarModule,
    DialogModule,
    ToastModule,
    PaginatorModule,
    CardModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    ProgressSpinnerModule,
    HttpClientModule,
    TagModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
