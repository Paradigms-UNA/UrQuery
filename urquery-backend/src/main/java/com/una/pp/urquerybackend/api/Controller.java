package com.una.pp.urquerybackend.api;

import com.una.pp.urquerybackend.logic.DataCompile;
import com.una.pp.urquerybackend.services.ServiceApp;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import java.sql.Timestamp;

@RequestMapping("api/una")
@RestController
public class Controller {

    @Autowired
    private ServiceApp service;

    @GetMapping(path = "/about")
    public JSONObject about() throws IOException, ParseException {  //despliega un json con la informacion de los integrantes
        return service.about();
    }

    @RequestMapping(value = "document/{DDDD}")
    public String search(@PathVariable String DDDD) {
        return service.search(DDDD);
    }

    @PostMapping(path = "/compile")
    public JSONObject compile(@RequestBody DataCompile data){
        Long datetime = System.currentTimeMillis();
        Timestamp timestamp = new Timestamp(datetime);
        JSONObject obj = new JSONObject();
        String info = "" + timestamp + " " + data.getData();
        obj.put("data", info);

        return obj;
    }

}
