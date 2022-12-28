import { Directive, HostBinding, Input, SimpleChange, KeyValueDiffer
        , KeyValueDiffers, ChangeDetectorRef} from "@angular/core"
import { TitleStrategy } from "@angular/router";

import { DiscountService } from "./discount.service"

@Directive({
    selector: "td[pa-price]",
    exportAs: "discount"
})

export class PaDiscountAmountDirective {
    private differ?: KeyValueDiffer<any, any>

    constructor(private keyValueDiffers: KeyValueDiffers,
                private changeDetector: ChangeDetectorRef,
                private discount: DiscountService) {

                this.originalPrice = 10;
                this.discountAmount = 110;

    }

    @Input("pa-price")
    originalPrice: number;

    discountAmount: number;

    ngOnInit(){
        this.differ = this.keyValueDiffers.find(this.discount).create();
    }

    ngOnChanges(changes: {[property:string]: SimpleChange}){
        if(changes["originalPrice"]!= null){
            this.updateValue();
            
        }
    }

    ngDoCheck(){
        if(this.differ?.diff(this.discount) != null) {
            this.updateValue();
        }
    }

    private updateValue(){
        // console.log(this.originalPrice,'...',this.discount.applyDiscount(this.originalPrice));
        
        this.discountAmount = this.originalPrice - this.discount.applyDiscount(this.originalPrice)
    }

}