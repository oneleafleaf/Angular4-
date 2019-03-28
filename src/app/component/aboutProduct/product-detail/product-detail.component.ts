import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Comment, Product, ProductService} from '../../../shared/product.service';
import {WebSocketService} from "../../../shared/web-socket.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

	product: Product;

	comments: Comment[];

  commentsLength:number;

  newRating:number = 5;

  newComment:string = "";

  isCommentHidden:boolean = true;

  sum:number = 0;

  isFollow:boolean = false;

  currentBid:number;

  constructor(private routeInfo: ActivatedRoute,
              private productService: ProductService,
              private ws: WebSocketService) { }

  ngOnInit() {
    let productId:number = this.routeInfo.snapshot.params['productId'];

    this.productService.getProduct(productId).
    subscribe(
      product => {
        this.product = product;
        this.currentBid = product.price;
      }
    );

    this.productService.getCommentsForProductId(productId).
    subscribe(
      comments => {
        this.comments = comments;
        this.commentsLength = comments.length;
      }
    );

  }

  addComment(){
    if(this.newComment != ""){
      let comment = new Comment(this.commentsLength, this.product.id, new Date().toISOString(), "someone", this.newRating, this.newComment);
      this.comments.unshift(comment);

      this.sum = 0;
      this.comments.forEach(it => {
        this.sum += it.rating;
      });
      this.product.rating = this.sum/this.comments.length;

      this.newComment = "";
      this.newRating = 5;
      this.isCommentHidden = true;

    }
  }

  //是否”关注“的点击事件
  // followProduct(){
  //   this.isFollow = !this.isFollow;
  //     this.ws.createObservableSocket('ws://localhost:9002', this.product.id)
  //       .subscribe(
  //         products => {
  //           let product = products.find(p => {p.productId === this.product.id});
  //           console.log(products)
  //           // this.currentBid = product.bid;
  //         }
  //       );
  //   }

}
