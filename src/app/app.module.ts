import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { LearningComponent } from './components/learning/learning.component';
import { SalaryComponent } from './components/salary/salary.component';
import { ValueaddComponent } from './components/valueadd/valueadd.component';

@NgModule({ declarations: [
        AppComponent,
        LearningComponent,
        SalaryComponent,
        ValueaddComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        TabViewModule,
        TableModule,
        ChartModule,
        CardModule,
        ToastModule], providers: [MessageService, provideHttpClient(withInterceptorsFromDi()), providePrimeNG({
            theme: {
                preset: Aura
            }
        })] })
export class AppModule { }
