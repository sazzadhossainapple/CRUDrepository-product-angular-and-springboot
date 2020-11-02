import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgserviceService } from '../ngservice.service';
import { Products } from '../products';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  id: number;
  products: Products;
 

  constructor(private _route:Router, private _service: NgserviceService, private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.products = new Products();

    this.id = this._activatedRoute.snapshot.params['id'];
    
    this._service.fetchProductByidFromRemote(this.id)
      .subscribe(data => {
        console.log(data)
        this.products = data;
      }, error => console.log(error));




    //let id =parseInt (this._activatedRoute.snapshot.paramMap.get('id'));
    //this._service.fetchProductByidFromRemote(id).subscribe(
    //  data =>{
     //   console.log("data recieved");
     //   this.products=data;

     // }

   // ),
   //  error=> console.log("eception occured")
  }

  updateProduct(){
    this._service.updateProduct(this.id, this.products)
      .subscribe(
        data =>{
          console.log(data);
          this.products = new Products();
          this._route.navigate(['productlist']);


        } , 
        error => console.log(error));
    
  
  }
  updateProductformsubmit(){
    this.updateProduct();

  }

 // updateProductformsubmit(){
 // this._service.addProductToRemote(this.products).subscribe(
  //  data =>{
     // console.log("data added successfuly");
   //   this._route.navigate(['productlist']);


  //  },
  //  error =>console.log("error")

    
 // )
//}

gotolist(){
  console.log('go back');
  this._route.navigate(['productlist']);
}


}
