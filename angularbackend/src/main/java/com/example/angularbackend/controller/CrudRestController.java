package com.example.angularbackend.controller;

import com.example.angularbackend.exception.ResourceAlreadyExistException;
import com.example.angularbackend.exception.ResourceDoseNotExistException;
import com.example.angularbackend.model.Product;
import com.example.angularbackend.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CrudRestController {

private CrudService crudService;
    @Autowired
    public CrudRestController(CrudService crudService) {
        this.crudService = crudService;

    }

    @GetMapping("/getproductbyid/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Product> fetchProductById(@PathVariable long id) {

        try {
            Product product = crudService.findById(id);
            return ResponseEntity.ok(product);
        } catch (ResourceDoseNotExistException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/getproductList")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<Product>> fetchProductList() {
        List<Product> productList= crudService.findAll();
        return ResponseEntity.ok(productList);
    }



    @PostMapping("/addproduct")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
        try {
            Product insertProduct = crudService.insertProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(insertProduct);
        } catch (ResourceAlreadyExistException e) {
            return ResponseEntity.badRequest().body(null);
        }

    }
//    @PutMapping("/updateproduct/{id}")
//    @CrossOrigin(origins = "http://localhost:4200")
//    public Product addCity(@PathVariable long id,@RequestBody Product product) throws ResourceDoseNotExistException {
//        return crudService.updateProduct(id,product);
//    }

    @PutMapping("/updateproduct/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> saveProduct(@RequestBody Product product,
                                            @PathVariable("id") long id) throws ResourceDoseNotExistException {

        Product currentUser = crudService.findById(id);
        if (currentUser == null) {
            return new ResponseEntity(new ResourceDoseNotExistException("Unable to update. User with id " + id + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        currentUser.setName(product.getName());
        currentUser.setDescription(product.getDescription());
        currentUser.setPrice(product.getPrice());
        crudService.updateProduct(id,currentUser);
        return new ResponseEntity<Product>(currentUser, HttpStatus.OK);
    }


    @DeleteMapping("/deleteproductbyid/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Long> deleteProductById(@PathVariable long id) {
        try {
            boolean deleted = crudService.deleteById(id);
            return ResponseEntity.ok(id);
        } catch (ResourceDoseNotExistException e) {
            return ResponseEntity.notFound().build();

        }

    }
}
