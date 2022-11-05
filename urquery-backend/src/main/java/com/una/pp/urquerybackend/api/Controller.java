package com.una.pp.urquerybackend.api;

import com.una.pp.urquerybackend.logic.DataCompile;
import com.una.pp.urquerybackend.logic.XmlDocument;
import com.una.pp.urquerybackend.services.PrologService;
import com.una.pp.urquerybackend.services.DocumentService;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

import java.sql.Timestamp;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RequestMapping("api/una")
@RestController
public class Controller {

    private DocumentService service;
    
    @Autowired
    public Controller(DocumentService service) {
        this.service = service;
    }

    @GetMapping(path = "/about")
    public JSONObject about() throws IOException, ParseException {  //method to load work team and course information
        return service.about(); // call to the service to execute the method about
    }

    @RequestMapping(value = "document/{DDDD}")
    public String search(@PathVariable String DDDD) { //method to search an specific dcoument stored in the server
        try {
            return service.search(DDDD); // call to the service to execute the method search
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Document Not Found", e);
        }
    }

    @PostMapping(path = "/compile")
    public JSONObject compile(@RequestBody DataCompile data) {  // method to analize the semanthic and sintaxis of a document

        try {
            if (PrologService.instance().connectionTest()) { // if the connection with the server is succesful
                Long datetime = System.currentTimeMillis();
                Timestamp timestamp = new Timestamp(datetime);
                JSONObject obj = new JSONObject();
                String info = "" + timestamp + " " + data.getData();
                obj.put("data", info);
                return obj;
            }
            throw new Exception();
        } catch (Exception e) {
            throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, "No connection with Prolog Server", e);
        }
        
    }
    

    /**
     * Receives a document and adds it to the DB.
     * 
     * @throws ResponseStatusException if the document already exists compring by id
     *      => It could throw an error if there are missing fields in the JSON. (this is not handled)
     * 
     * @param document an XmlDocument instance
     * @return the new created document in the database.
     */
    @PostMapping(path = "/document")
    public XmlDocument insertDocument(@RequestBody XmlDocument document) {
        try {
            return this.service.addDocument(document);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Repeated ID for document", e);
        }
    }
    
    
    @PutMapping(value="/document/{id}")
    public XmlDocument updaDocument(@PathVariable String id, @RequestBody XmlDocument document) {
        try {
            document.setId(id);
            return this.service.updaDocument(document);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no such document", e);
        }
        
    }
}
