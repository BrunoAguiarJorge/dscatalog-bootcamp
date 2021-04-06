package com.brunoaguiar.dscatalog.tests.integration;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.brunoaguiar.dscatalog.repositories.ProductRepository;
import com.brunoaguiar.dscatalog.services.ProductService;
import com.brunoaguiar.dscatalog.services.exceptions.ResourceNotFoundException;

@SpringBootTest
public class ProductServiceIntegration {

	@Autowired
	private ProductService service;

	private long existingId;
	private long NonExistingId;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		NonExistingId = 1000L;
		
		
	}
	
	@Test
	public void deleteShouldThrowResourceNotNotFoundExceptiosWhenIdDoesNotExists() {

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(NonExistingId);
		});
	}

	@Test
	public void deleteShouldDoNothingWhenIdExists() {

		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});
	}
}
