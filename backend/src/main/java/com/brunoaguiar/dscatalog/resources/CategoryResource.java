package com.brunoaguiar.dscatalog.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brunoaguiar.dscatalog.entities.Category;
import com.brunoaguiar.dscatalog.services.CategoryService;

//use rest controller to make this class a resource 
@RestController
@RequestMapping(value = "/categories")
public class CategoryResource {
	
	//let resource layer access service layer.
	@Autowired
	private CategoryService service;
	@GetMapping
	//create a list with categories in it!
	public ResponseEntity<List<Category>> findAll(){
		List<Category> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}

	
}
