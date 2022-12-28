import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PaIteratorDirective } from './iterator.direcive';


// import { AppComponent } from './app.component';
import { ProductComponent } from './component';
import { PaAttriDirective } from './attr.directive';
import { PaModel } from './twoway.directive';
import { PaStructureDirective } from './structure.directive';
import { PaCellColor } from './cellColor.directive';
import { PaCellColorSwitcher } from './cellColorSwitcher.directive';
import { ProductFormComponent } from './productForm.component';
import {ProductTableComponent} from './productTable.component';
import { VALUE_SERVICE, PaDisplayValueDirective } from "./valueDisplay.directive"; 
import { Model } from './repository.model';


@NgModule({
  declarations: [
    ProductComponent,PaAttriDirective,PaModel,PaStructureDirective,
    PaIteratorDirective,PaCellColor,PaCellColorSwitcher,
    ProductFormComponent,
    ProductTableComponent,
    PaDisplayValueDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    
  ],
  providers: [{provide: VALUE_SERVICE, useValue: "Apples"},Model],
  bootstrap: [ProductComponent]
})
export class AppModule { }
