package com.brunoaguiar.dscatalog.tests.factory;

import java.time.Instant;

import com.brunoaguiar.dscatalog.dto.ProductDTO;
import com.brunoaguiar.dscatalog.entities.Category;
import com.brunoaguiar.dscatalog.entities.Product;

public class ProductFactory {

	public static Product createProduct() {

		Product product = new Product(1L, "Phoone", "Good Phone", 800.0, "http://img.com/img.png",
				Instant.parse("2020-10-21T03:00:00Z"));
		product.getCategories().add(new Category(1L, null));
		return product;
	}

	public static ProductDTO createProductDTO() {
		Product product = createProduct();
		return new ProductDTO(product, product.getCategories());
	}
	
	public static ProductDTO createProductDTO(Long id) {
		ProductDTO dto = createProductDTO();
		dto.setId(id);
		return dto;
	}

}
