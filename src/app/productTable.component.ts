import { Component, Input, ViewChildren, QueryList} from "@angular/core"
import { PaCellColor } from "./cellColor.directive";


import { Model } from "./repository.model";
import { Product } from "./product.model";
import { DiscountService } from "./discount.service";
import { LogService } from "./log.service";
@Component({
    selector: "paProductTable",
    templateUrl: "productTable.component.html",
    providers:[LogService]
})

export class ProductTableComponent{


    // discounter: DiscountService = new DiscountService();

    constructor(private dataModel: Model){

    }

    // @Input("model")
    // dataModel?: Model;


    getProduct(key: number): Product {
            return this.dataModel?.getProduct(key);
    }

    getProducts(): Product[] {

       let retP = this.dataModel?.getProducts() || [];
       return retP

    }

    deleteProduct(key: number){
        this.dataModel?.deleteProduct(key)
    }

    showTable: boolean = true;

    @ViewChildren(PaCellColor)
    viewChildren?: QueryList<PaCellColor>;

    ngAfterViewInit(){
      this.viewChildren?.changes.subscribe(()=>{
        this.updateViewChildren();
      });
      this.updateViewChildren();
    }

    private updateViewChildren(){
      setTimeout(()=>{
        this.viewChildren?.forEach((child,index)=>{
          child.setColor(index % 2 ? true : false);
        })
      },0);
    }


    taxRate: number=0
    categoryFilter: any;
    itemCount: number = 3;

    dateObject: Date = new Date(2020, 1, 20);
    dateString: string="2020-02T00:00:00.000Z";
    dateNumber : number =1582156800000;

    selectMap={
      "Watersports": "stay dry",
      "Soccer": "score goals",
      "other": "have fun",
    }

    numberMap ={
      "=1": "one product",
      "=2": "two product",
      "other": "# product",
    }
}
