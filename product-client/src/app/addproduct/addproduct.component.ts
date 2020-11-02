import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { from } from 'rxjs';
import {Products} from '../products';
import {Router} from '@angular/router';
import { NgserviceService } from '../ngservice.service';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  products = new Products();
  constructor(private _route:Router, private _service: NgserviceService) { }

  ngOnInit(): void {
  }

  addProductformsubmit(){
    this._service.addProductToRemote(this.products).subscribe(
      data =>{
        console.log("data added successfuly");
        this._route.navigate(['productlist']);


      },
      error =>console.log("error")

      
    )
  }
  gotolist(){
    console.log('go back');
    this._route.navigate(['productlist']);
  }

}
