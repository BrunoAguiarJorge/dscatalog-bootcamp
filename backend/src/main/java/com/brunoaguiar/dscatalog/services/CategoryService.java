package com.brunoaguiar.dscatalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brunoaguiar.dscatalog.entities.Category;
import com.brunoaguiar.dscatalog.repositories.CategoryRepository;


@Service
public class CategoryService {

	//connect this service class to the categoryRepository class to fetch information from repository class 
	@Autowired
	private CategoryRepository repository;
	public List<Category> findAll(){
		return repository.findAll();
		
	}
}
