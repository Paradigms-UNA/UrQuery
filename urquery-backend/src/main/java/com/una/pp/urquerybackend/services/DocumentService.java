package com.una.pp.urquerybackend.services;

import com.mongodb.MongoWriteException;
import com.una.pp.urquerybackend.UrqueryBackendApplication;
import com.una.pp.urquerybackend.logic.Information;
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
    private MongoRepository<XmlDocument, String> xmlRepository;
    @Autowired
    private MongoRepository<ScriptDocument, String> scriptRepository;

    @Autowired
    private MongoRepository<Information, String> infoRepository;

    public List<Information> about() throws IOException, ParseException { // method to load work team and course information
        return infoRepository.findAll();
    }

    public String searchXmlDocument(String id) throws NotFoundException {   // method to search an xml document from the server
        return xmlRepository.findById(id)
                .orElseThrow( () -> new NotFoundException())
                .getData();
    }

    public String searchScriptDocument(String id) throws NotFoundException {   // method to search an script document from the server
        return scriptRepository.findById(id)
                .orElseThrow( () -> new NotFoundException())
                .getData();
    }

    public XmlDocument addXmlDocument(XmlDocument document) throws MongoWriteException {
        return this.xmlRepository.insert(document);
    }

    public ScriptDocument addScriptDocument(ScriptDocument document) throws MongoWriteException {
        return this.scriptRepository.insert(document);
    }

    public XmlDocument updaXmlDocument(XmlDocument document) throws NotFoundException {
        XmlDocument found = this.xmlRepository.findById(document.getId())
            .orElseThrow(() -> new NotFoundException());
        
        found.setData(document.getData());
        found.setTitle(document.getTitle());
        
        return this.xmlRepository.save(found);
    }

    public ScriptDocument updaScriptDocument(ScriptDocument document) throws NotFoundException {
        ScriptDocument found = this.scriptRepository.findById(document.getId())
                .orElseThrow(() -> new NotFoundException());

        found.setData(document.getData());
        found.setTitle(document.getTitle());

        return this.scriptRepository.save(found);
    }

    public List<XmlDocument> getAllXmlDocuments() throws IOException, ParseException {
        return this.xmlRepository.findAll();
    }

    public List<ScriptDocument> getAllScriptDocuments() throws IOException, ParseException {
        return this.scriptRepository.findAll();
    }

}

