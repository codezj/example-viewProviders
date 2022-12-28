import { ApplicationRef, Component } from "@angular/core";
import { Model } from "./repository.model";
import { Product } from "./product.model";
import {ProductFormGroup, ProductFormControl} from "./form.model"

@Component({
    selector: "app",
    templateUrl: "template.html"
})
export class ProductComponent{
    model: Model = new Model();
    formGroup: ProductFormGroup = new ProductFormGroup();
    showTable: boolean = false;
    darkColor: boolean = false;

    constructor(ref: ApplicationRef){
      (<any>window).appRef = ref;
      (<any>window).model = this.model;
    }


    getProductByPosition(position: number): Product{
      return this.model.getProducts()[position]
    }

    getProduct(key: number): Product {
      
      
      return this.model.getProduct(key);
    }

    getProducts(): Product[] {
      return this.model.getProducts();
    }

    getProductCounts(): number {
      return this.model.getProducts().length;
    }

    newProduct: Product = new Product();
    formSubmitte: boolean = false;

    addProduct(p: Product){
      this.model.saveProduct(p);
    }

    submitForm(){
      this.addProduct(this.newProduct);
    }

    deleteProduct(key: number){
      this.model.deleteProduct(key);
    }
}