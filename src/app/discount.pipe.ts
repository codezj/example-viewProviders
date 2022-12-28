import { Pipe, Injectable   } from "@angular/core"
import { DiscountService } from "./discount.service"
import { LogService } from "./log.service";


@Pipe({
    name: "discount",
    pure: false
})
export class PaDiscountPipe{
    constructor(private discount: DiscountService,
                private logger: LogService){

    }

    transform(price: number){
        if (price > 10) {
            this.logger.logInfoMessage(`Large price discounted: ${price}`)
        }
        console.log("PIPE...transform ");
        
        return this.discount.applyDiscount(price);
    }
}