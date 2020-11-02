import { Component, OnInit } from '@angular/core';
import { NgserviceService} from '../ngservice.service';
import { Router} from '@angular/router';
import {Products} from '../products'
import { from } from 'rxjs';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  _produtslist: Products[];
 

  constructor(private _service:NgserviceService,private _route:Router) { }

  ngOnInit(): void {
    this.reloadData();
    
  }
  reloadData(){
    this._service.fetchProductListFromRemote().subscribe(
      data=>{
        console.log("response recieved");
        this._produtslist=data;

      } ,
      error=>console.log("exception occured")
      
    )

  }
  goToAddProduct(){
    this._route.navigate(['/addproduct']);
  }
  goToEditProduct(id:number){
    console.log("id"+id);
    this._route.navigate(['/editproduct',id]);
  }

  goToViewProduct(id:number){
    console.log("id"+id);
    this._route.navigate(['/detailsproduct',id]);
  }
  goToDeleteProduct(id:number){
    this._service.deleteProduct(id)
    .subscribe(
      data => {
        console.debug("deleted successfully");
        this.reloadData();
      },
      error => console.log("Exception occured"));

  }

}
