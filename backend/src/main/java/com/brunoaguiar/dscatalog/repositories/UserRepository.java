package com.brunoaguiar.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brunoaguiar.dscatalog.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	// check if there is an email in the db
	User findByEmail(String email);
}
