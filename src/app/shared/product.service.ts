import {Injectable, EventEmitter} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/RX";

@Injectable()

export class ProductService {

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  constructor(private http: Http) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get("/ngDemo/products").map(res => res.json());
  }

  getProduct(id:number): Observable<Product>{
    return this.http.get("/ngDemo/product/"+id).map(res => res.json());
  }

  getCommentsForProductId(id:number): Observable<Comment[]>{
    return this.http.get("/ngDemo/product/"+id+"/comments").map(res => res.json());
  }

  getAllCategories() : any {
    return ["电子商品", "硬件设备", "图书"];
  }

  //搜索表单中点击搜索按钮，商品列表调用http请求，符合筛选条件的商品

  search(params: ProductSearchParams): Observable<Product[]>{
    return this.http.get("/ngDemo/products",{search: this.encodeParams(params)}).map(res => res.json());
  }

  private encodeParams(params: ProductSearchParams){

    return Object.keys(params)
      .filter(key => params[key])
      .reduce((sum:URLSearchParams, key:string) => {
        sum.append(key, params[key]);
        return sum;
      }, new URLSearchParams());

  }

}

export class Product{

  constructor(
    public id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories:Array<string>
  ){}

}

export class Comment {

  constructor(
    public id:number,
    public productId:number,
    public timestamp:string,
    public user:string,
    public rating:number,
    public content:string
  ){}

}

export class ProductSearchParams{

  constructor(
    public title:string,
    public price:number,
    public category:string
  ){}

}
