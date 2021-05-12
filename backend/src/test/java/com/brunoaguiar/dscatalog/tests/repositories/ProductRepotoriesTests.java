package com.brunoaguiar.dscatalog.tests.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.brunoaguiar.dscatalog.entities.Product;
import com.brunoaguiar.dscatalog.repositories.ProductRepository;
import com.brunoaguiar.dscatalog.tests.factory.ProductFactory;

@DataJpaTest
public class ProductRepotoriesTests {
	@Autowired
	private ProductRepository repository;

	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	private long countPCGamesProducts;
	private PageRequest pageRequest;

	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 10000L;
		countTotalProducts = 25L;
		countPCGamesProducts = 21L;
		pageRequest = PageRequest.of(0, 10);

	}

	@Test
	public void findShouldReturnProductsWhenNameExistsIsEmpty() {

		String name = " ";

		Page<Product> result = repository.find(null, name, pageRequest);

		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());

	}

	@Test
	public void findShouldReturnProductsWhenNameExistsIgnoreCase() {

		String name = "pc gAMer";

		Page<Product> result = repository.find(null, name, pageRequest);

		Assertions.assertEquals(countPCGamesProducts, result.getTotalElements());
		Assertions.assertFalse(result.isEmpty());
	}

	@Test
	public void finishShouldReturnProductsWhenNameExists() {

		String name = "PC Gamer";

		Page<Product> result = repository.find(null, name, pageRequest);

		Assertions.assertEquals(countPCGamesProducts, result.getTotalElements());
		Assertions.assertFalse(result.isEmpty());
	}

	@Test
	public void saveShouldPersistWithAutoIncrementWhenIdIsNull() {

		Product product = ProductFactory.createProduct();
		product.setId(null);

		product = repository.save(product);
		Optional<Product> result = repository.findById(product.getId());

		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1L, product.getId());
		Assertions.assertTrue(result.isPresent());
		Assertions.assertSame(result.get(), product);

	}

	@Test

	public void deleteShouldDeleteObjectWhenIdExists() {

		repository.deleteById(existingId);

		Optional<Product> result = repository.findById(existingId);
		Assertions.assertFalse(result.isPresent());
	}

	@Test
	public void deleteShouldThrowExceptionWhenIdDoNotExist() {

		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);
		});
	}

}
