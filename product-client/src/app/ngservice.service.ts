import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Products } from './products';


@Injectable({
  providedIn: 'root'
})
export class NgserviceService {

  constructor(private _http:HttpClient) { }
  fetchProductListFromRemote():Observable<any>{
    return this._http.get<any>("http://localhost:8080/getproductList"); 
  }
  addProductToRemote(products:Products):Observable<any>{
    return this._http.post<any>("http://localhost:8080/addproduct",products);
  }

  fetchProductByidFromRemote(id:number):Observable<any>{
    return this._http.get<any>("http://localhost:8080/getproductbyid/"+id); 
  }

  updateProduct(id: number, value: any): Observable<Object> {
    return this._http.put("http://localhost:8080/updateproduct/"+id, value);
  }
  deleteProduct(id:number):Observable<any>{
    return this._http.delete<any>("http://localhost:8080/deleteproductbyid/"+id); 
  }
  

}
