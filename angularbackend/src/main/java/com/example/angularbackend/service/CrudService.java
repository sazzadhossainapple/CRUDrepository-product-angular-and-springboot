package com.example.angularbackend.service;

import com.example.angularbackend.exception.ResourceAlreadyExistException;
import com.example.angularbackend.exception.ResourceDoseNotExistException;
import com.example.angularbackend.model.Product;
import com.example.angularbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CrudService {

    private ProductRepository productRepository;
    @Autowired
    public CrudService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product findById(@PathVariable long id)throws ResourceDoseNotExistException {

        Optional<Product> optionalProduct = productRepository.findById(id);
        if(optionalProduct.isPresent()){
            return optionalProduct.get();
        }
        else {
            throw new ResourceDoseNotExistException(id +"");
        }

    }

    //findAll method
    public List<Product> findAll() {
        List<Product> productList = new ArrayList<>();
        productRepository.findAll().forEach(productList::add);
        return productList;
    }


    //deleteById method
    public boolean deleteById(long id) throws ResourceDoseNotExistException {

        Optional<Product> productOptional = productRepository.findById(id);
        productOptional.ifPresent(event -> productRepository.deleteById(id));
        productOptional.orElseThrow(() -> new ResourceDoseNotExistException(id + ""));
        return true;

    }

    //insert method
    public Product insertProduct(Product product) throws ResourceAlreadyExistException {
        Optional<Product> optionalProduct = productRepository.findById(product.getId());
        if (optionalProduct.isPresent()) {
            throw new ResourceAlreadyExistException(product.getId() + "");
        } else {
            return productRepository.save(product);
        }

    }


    //update method

    public Product updateProduct(long id,Product product) throws ResourceDoseNotExistException {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {

            product.setId(id);
            return productRepository.save(product);

        } else {
            throw new ResourceDoseNotExistException(id + "");
        }

    }


}
