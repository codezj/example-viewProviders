
import { outputAst } from "@angular/compiler";
import {Directive, ElementRef,Attribute, 
    SimpleChange,Input, Output,EventEmitter,
    HostListener, HostBinding
} from "@angular/core"

import { Product } from "./product.model";


@Directive({
    selector: "[pa-attr]",
})
export class PaAttriDirective {
    constructor (private element: ElementRef){

        // this.element.nativeElement.addEventListener("click", ()=>{
        //     if (this.product != null){
        //         this.click.emit(this.product.category)
        //     }
        // })
      
    }

    @Input("pa-attr")
    @HostBinding("class")
    bgClass: string | undefined;

    @Input("pa-product")
    product: Product | undefined;

    @Output("pa-category")
    click = new EventEmitter<string>();

    // ngOnInit(){
    //     this.element.nativeElement.classList.add(this.bgClass || "bg-success", "text-white")
    // }

    @HostListener("click")
    triggerCustomEvent(){
        if(this.product!=null){
            this.click.emit(this.product.category)
        }
    }


    ngOnChanges(changes: {[property: string]: SimpleChange}){
        let change = changes["bgClass"];
        let classList = this.element.nativeElement.classList;
        if(!change.isFirstChange() && classList.contains(change.previousValue)){
            classList.remove(change.previousValue)
        }

        if(!classList.contains(change.currentValue)){
            classList.add(change.currentValue);
        }
    }
}