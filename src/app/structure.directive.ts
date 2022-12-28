import {
    Directive, SimpleChange, ViewContainerRef, TemplateRef, Input, ChangeDetectorRef
} from "@angular/core"

@Directive({
    selector: "[paIf]"
})
export class PaStructureDirective {
    constructor(private containter: ViewContainerRef,
        private tempalte: TemplateRef<Object>){}


    @Input("paIf")
    expressionResult: boolean | undefined;
                                                                                     
    ngOnChanges(changes: {[property: string]: SimpleChange}){
        
        let change = changes["expressionResult"];
        
        
       
        if(!change.isFirstChange() && !change.currentValue){
            this.containter.clear();
         
            
        }
        else if (change.currentValue){
            this.containter.createEmbeddedView(this.tempalte)
            
            
        }
    }
}