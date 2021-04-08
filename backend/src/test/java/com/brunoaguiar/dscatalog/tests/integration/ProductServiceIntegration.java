package com.brunoaguiar.dscatalog.tests.integration;



import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import com.brunoaguiar.dscatalog.dto.ProductDTO;
import com.brunoaguiar.dscatalog.services.ProductService;
import com.brunoaguiar.dscatalog.services.exceptions.ResourceNotFoundException;

@SpringBootTest
@Transactional
public class ProductServiceIntegration {

	@Autowired
	private ProductService service;

	private long existingId;
	private long NonExistingId;
	private long countTotalProducts;
	private long countPCGamesProducts;
	private PageRequest pageRequest;

	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		NonExistingId = 1000L;
		countTotalProducts = 25L;
		countPCGamesProducts = 21L;
		pageRequest = PageRequest.of(0, 10);
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

	@Test
	public void findAllPagedShouldReturnNothingWhenNameDoesNotExists() {

		String name = "Camera";

		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);

		Assertions.assertTrue(result.isEmpty());
	}

	@Test
	public void findAllPagedShouldReturnProductsWhenNameExistsIsEmpty() {

		String name = "";

		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);

		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
		
	}

	@Test
	public void findAllPagedShouldReturnProductsWhenNameExistsIgnoreCase() {

		String name = "pc gAMer";

		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);

		Assertions.assertEquals(countPCGamesProducts, result.getTotalElements());
		Assertions.assertFalse(result.isEmpty());
	}

	@Test
	public void finishShouldReturnProductsWhenNameExists() {

		String name = "PC Gamer";

		Page<ProductDTO> result = service.findAllPaged(0L, name, pageRequest);

		Assertions.assertEquals(countPCGamesProducts, result.getTotalElements());
		Assertions.assertFalse(result.isEmpty());
	}
}
