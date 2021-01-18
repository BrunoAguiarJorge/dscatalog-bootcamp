package com.brunoaguiar.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brunoaguiar.dscatalog.dto.CategoryDTO;
import com.brunoaguiar.dscatalog.entities.Category;
import com.brunoaguiar.dscatalog.repositories.CategoryRepository;


@Service
public class CategoryService {

	//connect this service class to the categoryRepository class to fetch information from repository class 
	@Autowired
	private CategoryRepository repository;
	public List<CategoryDTO> findAll() {
		List<Category> list = repository.findAll();
		
		//Lambda expression that transform list category into categoryDTO
		return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
	
		
	}
}
