package com.una.pp.urquerybackend.services;


import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.*;

@Service
public class PrologService {

    private static PrologService prologService;


    public static PrologService instance() {
        if (prologService == null) {
            prologService = new PrologService();
        }
        return prologService;
    }

    public boolean connectionTest() throws URISyntaxException, IOException, InterruptedException {

        String url = "http://localhost:8000/add";

        try {
            HttpHeaders headers = new HttpHeaders();    // se crean los headers
            headers.setContentType(MediaType.APPLICATION_JSON);   // seleccion del tipo de contenido
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON)); // acepta el tipo de headers

            String data = "{\"a\":1, \"b\":2 }"; //se simula la creacion de un documento json

            HttpEntity entity = new HttpEntity<>(data, headers); // se crea el request

            RestTemplate e = new RestTemplate(); // permite consumir servicios Restful
            e.postForObject(url, entity, Object.class); // se envia el POST request

            return true;
        } catch (Exception e){
            System.out.println("Prolog Server seems to be down");
            return false;
        }
    }
}
