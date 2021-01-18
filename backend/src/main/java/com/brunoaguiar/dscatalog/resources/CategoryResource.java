package com.brunoaguiar.dscatalog.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brunoaguiar.dscatalog.entities.Category;

//use rest controller to make this class a resource 
@RestController
@RequestMapping(value = "/categories")
public class CategoryResource {
	
	@GetMapping
	//create a list with categories in it!
	public ResponseEntity<List<Category>> findAll(){
		//implement the list
		List<Category> list = new ArrayList<>();
		//Add elements to the list
		list.add(new Category(1L, "Books"));
		list.add(new Category(2L, "Electronics"));
		//return the list/ "ok" return http response 200.
		return ResponseEntity.ok().body(list);
	}

	
}
