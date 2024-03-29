package com.brunoaguiar.dscatalog.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.brunoaguiar.dscatalog.dto.ProductDTO;
import com.brunoaguiar.dscatalog.services.ProductService;

//use rest controller to make this class a resource 
@RestController
@RequestMapping(value = "/products")
public class ProductResource {

	// let resource layer access service layer.
	@Autowired
	private ProductService service;

	@GetMapping
	// create a list with all categories in it! RequestParam -> used for pagination!
	public ResponseEntity<Page<ProductDTO>> findAll(Pageable pageable ) {
		Page<ProductDTO> list = service.findAllPaged(pageable);
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}")
		public ResponseEntity<ProductDTO> findById(@PathVariable Long id) {
		ProductDTO dto = service.findById(id);
			return ResponseEntity.ok().body(dto);
	}

	@PostMapping
	public ResponseEntity<ProductDTO> insert(@Valid @RequestBody ProductDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		// created return http code 201
		return ResponseEntity.created(uri).body(dto);
	}

	/**
	 * commented because I am not using aws to upload images
	 */
//	@PostMapping(value = "/image")
//	public ResponseEntity<UriDTO> uploadImage(@RequestParam("file") MultipartFile file) {
//		UriDTO dto = service.uploadFile(file);
//		return ResponseEntity.ok().body(dto);
//	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<ProductDTO> update(@PathVariable Long id, @Valid @RequestBody ProductDTO dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<ProductDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
