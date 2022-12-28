import { Directive, Input, Output, EventEmitter,
        SimpleChange, ContentChild, ContentChildren, QueryList} from "@angular/core"

import { PaCellColor } from "./cellColor.directive"


@Directive({
    selector: "table"
})

export class PaCellColorSwitcher {
    @Input("paCellDarkColor")
    modelProperty?: Boolean;

    @ContentChildren(PaCellColor, {descendants: true})
    ContentChildren? : QueryList<PaCellColor>;

    ngOnChanges(changes: { [property: string]: SimpleChange}){
       this.updateContentChildren(changes["modelProperty"].currentValue)
    }

    ngAfterContentInit(){
        console.log('ngAfterContentInit....',this.modelProperty);
        
        this.ContentChildren?.changes.subscribe(()=>{

            if (this.modelProperty != undefined){
                let mP = this.modelProperty
                setTimeout(()=> this.updateContentChildren(mP),0)
            }
        })
    }

    private updateContentChildren(dark: Boolean){
        console.log('updateContentChildren...',dark);
        
        if (this.ContentChildren != null && dark !=undefined){
            this.ContentChildren.forEach((child,index)=> {
                child.setColor(index %2 ? dark : !dark)
            })
        }
    }
}