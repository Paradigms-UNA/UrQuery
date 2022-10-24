package com.una.pp.urquerybackend.services;

import com.una.pp.urquerybackend.data.DocumentRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

@Service
public class ServiceApp {

    private DocumentRepository repository;
    @Autowired
    public ServiceApp(DocumentRepository documentRepository){
        this.repository = documentRepository;
    }

    public JSONObject about() throws IOException, ParseException { // method to load work team and course information
        JSONParser parser = new JSONParser();
        FileReader reader = new FileReader(new File("target/classes/data/group.json").getAbsolutePath()); // file location
        Object obj = parser.parse(reader);
        JSONObject pJsonObj = (JSONObject) obj;
        return pJsonObj;
    }

    public String search(String id) throws NotFoundException {   // method to search a document from the server
        return repository.getDocuments()
                .stream()
                .filter(document -> document.getId().equals(id))
                .findFirst()
                .orElseThrow( () -> new NotFoundException())
                .getData();
    }

    
}
