/**
 * @Project: UrQuery
 * @course EIF 400 - Programming Paradigms
 * @year 2022
 * @authors: 
 * Elias Arias Muñoz
 * Jose Andres Lopez Cruz
 * Carlos Albornoz Rondon
 * Jose Joaquin Garcia Ramirez
 * Julissa Seas Segura
 * 
 * @file DocumentRepository.java
 */

package com.una.pp.urquerybackend.data;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.una.pp.urquerybackend.logic.XmlDocument;

//Se debe conservar este archivo para contar con un @Bean que represente el repositorio
@Repository
public interface DocumentRepository extends MongoRepository<XmlDocument, String> {
    
}
