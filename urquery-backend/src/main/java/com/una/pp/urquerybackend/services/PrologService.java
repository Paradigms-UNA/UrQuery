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
            HttpHeaders headers = new HttpHeaders();    // headers are created
            headers.setContentType(MediaType.APPLICATION_JSON);   // data type selection
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON)); // data type accept

            String data = "{\"a\":1, \"b\":2 }";

            HttpEntity entity = new HttpEntity<>(data, headers); // request is created

            RestTemplate e = new RestTemplate(); // permit consume Resful services
            e.postForObject(url, entity, Object.class); // POST request is send

            return true;
        } catch (Exception e){
            System.out.println("Prolog Server seems to be down");
            return false;
        }
    }
}
