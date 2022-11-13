package com.una.pp.urquerybackend.services;

import com.mongodb.MongoWriteException;
import com.una.pp.urquerybackend.logic.ScriptDocument;
import com.una.pp.urquerybackend.logic.XmlDocument;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private MongoRepository<XmlDocument, String> repository;
    @Autowired
   // private MongoRepository<ScriptDocument, String> scriptRepository;

    public JSONObject about() throws IOException, ParseException { // method to load work team and course information
        JSONParser parser = new JSONParser();
        FileReader reader = new FileReader(new File("target/classes/data/group.json").getAbsolutePath()); // file location
        Object obj = parser.parse(reader);
        JSONObject pJsonObj = (JSONObject) obj;
        return pJsonObj;
    }

    public String search(String id) throws NotFoundException {   // method to search a document from the server
        return repository.findById(id)
                .orElseThrow( () -> new NotFoundException())
                .getData();
    }

    public XmlDocument addDocument(XmlDocument document) throws MongoWriteException {
        return this.repository.insert(document);
    }

    public XmlDocument updaDocument(XmlDocument document) throws NotFoundException {
        XmlDocument found = this.repository.findById(document.getId())
            .orElseThrow(() -> new NotFoundException());
        
        found.setData(document.getData());
        found.setTitle(document.getTitle());
        
        return this.repository.save(found);
    }

    public List<XmlDocument> getAll() throws IOException, ParseException {
        return this.repository.findAll();
    }
}
