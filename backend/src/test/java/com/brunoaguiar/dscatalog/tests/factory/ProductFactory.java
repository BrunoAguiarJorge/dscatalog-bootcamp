package com.brunoaguiar.dscatalog.tests.factory;

import java.time.Instant;

import com.brunoaguiar.dscatalog.dto.ProductDTO;
import com.brunoaguiar.dscatalog.entities.Product;

public class ProductFactory {

	public static Product createProduct() {

		return new Product(1L, "Phoone", "Good Phone", 800.0, "http://img.com/img.png",
				Instant.parse("2021-10-21T03:00:00Z"));
	}

	public static ProductDTO createProductDTO() {
		return new ProductDTO(createProduct());
	}

}
