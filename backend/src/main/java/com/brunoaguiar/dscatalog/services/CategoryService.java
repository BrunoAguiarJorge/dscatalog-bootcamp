package com.brunoaguiar.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brunoaguiar.dscatalog.dto.CategoryDTO;
import com.brunoaguiar.dscatalog.entities.Category;
import com.brunoaguiar.dscatalog.repositories.CategoryRepository;
import com.brunoaguiar.dscatalog.resources.exceptions.DataBaseException;
import com.brunoaguiar.dscatalog.services.exceptions.ResourceNotFoundException;


@Service
public class CategoryService {

	//connect this service class to the categoryRepository class to fetch information from repository class 
	@Autowired
	private CategoryRepository repository;
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> findAll() {
		List<Category> list = repository.findAll();
		//Lambda expression that transform list category into categoryDTO
		return list.stream().map(x -> new CategoryDTO(x)).collect(Collectors.toList());
		
	}
	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		Optional<Category> obj = repository.findById(id);
		Category entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity Not Found"));
		return new CategoryDTO(entity);
		
	}
	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category entity = new Category();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
	}
	
	@Transactional
	public CategoryDTO update(Long id, CategoryDTO dto) {
		try {
		Category entity = repository.getOne(id);
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity violation");
		}
		
	}
}
