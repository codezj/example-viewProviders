import {Directive, ViewContainerRef, TemplateRef, Input, SimpleChange,
    IterableDiffers, ChangeDetectorRef, DefaultIterableDiffer,ViewRef
    } from "@angular/core"

@Directive({
selector: "[paForOf]"
})
export class PaIteratorDirective{

private differ: DefaultIterableDiffer<any>;
private views: Map<any, PaIteratorContext> = new Map<any, PaIteratorContext>();

constructor (private container: ViewContainerRef, private template: TemplateRef<Object>,
    private differs: IterableDiffers,private changeDetector: ChangeDetectorRef
    ){
    
        this.differ = new DefaultIterableDiffer<any>
    
}

@Input("paForOf")
dataSource: any;

ngOnInit()
{
    // this.updateContent();
    this.differ = <DefaultIterableDiffer<any>> this.differs.find(this.dataSource).create();
    // this.container.clear();
    // for (let i = 0; i < this.dataSource.length; i++){
    //     this.container.createEmbeddedView(this.template,
    //         new PaIteratorContext(this.dataSource[i],
    //             i, this.dataSource.length));
    // }
}

ngDoCheck(){
    // console.log("ngDoCheck Called");
    // this.updateContent()
    // let changes = this.differ.diff(this.dataSource)

    let changes = this.differ.diff(this.dataSource);
    if (changes != null){
        console.log("ngDoCheck called, changes detected",changes);
        changes.forEachAddedItem(addition => {
            


            console.log(addition.currentIndex);
            let Cindex = addition.currentIndex || 0;
            let addLen = changes?.length || 5;
            
            let context = new PaIteratorContext(addition.item,Cindex,addLen,Cindex);
            context.view = this.container.createEmbeddedView(this.template,context);
            this.views.set(addition.trackById, context);
        });

        let removals = false;
        changes.forEachRemovedItem(removal => {
            removals = true;
            let context = this.views.get(removal.trackById);
            if (context != null && context.view){
                this.container.remove(this.container.indexOf(context.view));
                this.views.delete(removal.trackById)
            }
        });
        if (removals){
            let index = 0;
            this.views.forEach(context => 
                context.setData(index++, this.views.size))
        }
        
    }
    
}


private updateContent(){
    this.container.clear()
    for (let i =0; i<this.dataSource.length; i++){
        this.container.createEmbeddedView(this.template, 
            new PaIteratorContext(this.dataSource[i], i, this.dataSource.length, i));
    }
}
}

class PaIteratorContext {

odd: boolean; even: boolean;
first: boolean; last: boolean;
view?: ViewRef;



constructor(public $implicit: any
    ,public position: number, total: number, public index: number){
        this.odd = index % 2 == 1;
        this.even = !this.odd;
        this.first = index == 0;
        this.last = index == total-1;
        this.setData(position,total)
        // this.view = viewTest||
        
        

    //     setInterval(()=>{
    //         this.odd = !this.odd;
    //         this.even = !this.even;
    //         this.$implicit.price++;
    //     },2000)
    }

    setData(index: number, total: number){
        this.odd = index % 2 == 1;
        this.even = !this.odd;
        this.first = index == 0;
        this.last = index == total-1;

    }

}