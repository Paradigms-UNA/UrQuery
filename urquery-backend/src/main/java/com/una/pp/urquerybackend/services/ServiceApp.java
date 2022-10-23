package com.una.pp.urquerybackend.services;

import com.una.pp.urquerybackend.data.DocumentRepository;
import com.una.pp.urquerybackend.logic.Document;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
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

    public JSONObject about() throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        FileReader reader = new FileReader(
                new File("src/main/java/com/una/pp/urquerybackend/data/group.json").getAbsolutePath());
        Object obj = parser.parse(reader);
        JSONObject pJsonObj = (JSONObject) obj;
        return pJsonObj;
    }

    public String search(String id) {
        return repository.getDocuments()
                .stream()
                .filter(document -> document.getId().equals(id))
                .findFirst()
                .orElse(new Document())
                .getData();
    }

    
}
