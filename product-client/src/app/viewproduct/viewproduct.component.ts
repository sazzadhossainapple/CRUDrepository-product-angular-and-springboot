import { Component, OnInit } from '@angular/core';
import { Products } from '../products';
import { Router, ActivatedRoute } from '@angular/router';
import { NgserviceService } from '../ngservice.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

 
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
  }

gotolist(){
  console.log('go back');
  this._route.navigate(['productlist']);
}


}
