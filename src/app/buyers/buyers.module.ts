import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyersRoutingModule } from './buyers-routing.module';
import { BuyerComponent } from './buyers/buyer/buyer.component';


@NgModule({
  declarations: [
    BuyerComponent
  ],
  imports: [
    CommonModule,
    BuyersRoutingModule
  ]
})
export class BuyersModule { }
