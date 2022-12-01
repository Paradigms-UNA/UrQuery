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
 * @file XmlDocumentRepository.java
 */

package com.una.pp.urquerybackend.data;

import com.una.pp.urquerybackend.logic.ScriptDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface XmlDocumentRepository extends MongoRepository<ScriptDocument, String> {
}
