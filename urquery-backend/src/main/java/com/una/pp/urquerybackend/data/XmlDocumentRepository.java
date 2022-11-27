package com.una.pp.urquerybackend.data;

import com.una.pp.urquerybackend.logic.ScriptDocument;
import com.una.pp.urquerybackend.logic.XmlDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface XmlDocumentRepository extends MongoRepository<ScriptDocument, String> {
}
