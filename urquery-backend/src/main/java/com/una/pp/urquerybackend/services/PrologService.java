package com.una.pp.urquerybackend.services;


import com.una.pp.urquerybackend.logic.DataCompile;
import com.una.pp.urquerybackend.logic.ScriptDocument;
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

    public ScriptDocument FromUqToJs(ScriptDocument document) throws URISyntaxException, IOException, InterruptedException {

        String url = "http://localhost:8000/transpile";

        try {
            HttpHeaders headers = new HttpHeaders();    // headers are created
            headers.setContentType(MediaType.APPLICATION_JSON);   // data type selection
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON)); // data type accept

            String data =" {\n" +
                    "  \"script\": \""+ document.getData() +"\"\n" +
                    " }";

            HttpEntity entity = new HttpEntity<>(data, headers); // request is created

            RestTemplate e = new RestTemplate(); // permit consume Resful services

            RestTemplate template = new RestTemplate(); // permit to consume Resful services

            HttpEntity<DataCompile> response = template.exchange(url, HttpMethod.POST, entity, DataCompile.class); // POST request is send
            DataCompile jsCode  = response.getBody(); // the data compiled form Prolog is save in a dataCompile object
            // to be manipulate

            if(jsCode.isAccepted()){
                System.out.println(jsCode.getTarget());
                document.setTarget(jsCode.getTarget());
            }
        } catch (Exception e){
            System.out.println("Prolog Server seems to be down");
        }
        return document;
    }
}
