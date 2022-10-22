package com.una.pp.urquerybackend.data;

import com.una.pp.urquerybackend.logic.Document;

import java.util.*;

import org.springframework.stereotype.Service;

@Service
public class Documents {

    private static Documents uniqueInstance;

    public static Documents instance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Documents();
        }
        return uniqueInstance;
    }
    private List<Document> documents = new ArrayList<>();

    public Documents(){
        documents.add(new Document("1","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus volutpat ligula id rhoncus. Vestibulum posuere, risus sed sagittis faucibus, eros urna porta eros, eu tempor justo lacus ac lacus. Curabitur aliquam erat non ligula blandit, vel blandit massa tincidunt. Donec eget mauris at mauris aliquam lobortis. Ut tempus sapien eu libero elementum lobortis. Curabitur auctor sed ipsum id faucibus. Ut sit amet euismod nisi, pulvinar hendrerit velit. Etiam lobortis euismod enim in fringilla. Nunc vitae turpis nec mauris sollicitudin elementum eget ac est. Morbi ullamcorper urna id pellentesque elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."));
        documents.add(new Document("2","Vivamus ac aliquam nulla. Pellentesque et dignissim velit, faucibus elementum eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc eleifend pulvinar neque, eget tristique felis faucibus tempor. Sed eu sodales ligula. Aenean pellentesque erat nibh, a bibendum elit hendrerit at. Phasellus nec consequat mi. Pellentesque tempor cursus quam, id tincidunt arcu dignissim nec. Suspendisse pellentesque, eros vitae blandit fringilla, neque urna hendrerit lacus, quis congue leo ligula sit amet diam. Aenean lacus elit, aliquam nec hendrerit sit amet, accumsan ut nisl. Vivamus pulvinar, elit ut dictum venenatis, velit ipsum vehicula est, non luctus odio lorem id ipsum. Phasellus eu ipsum sit amet orci convallis tempus vitae a nulla. Morbi lacinia facilisis mi, eget ullamcorper erat viverra finibus."));
        documents.add(new Document("3","Vivamus a sapien mauris. Sed non ultricies quam. Nulla in tincidunt risus. Curabitur suscipit dolor non fringilla rutrum. Quisque risus diam, iaculis nec augue in, dictum tristique mauris. Vestibulum erat nisl, gravida ut malesuada tincidunt, vehicula non lectus. Nulla viverra elit et justo congue, eu rhoncus tellus efficitur. Sed ultricies lectus nunc, semper facilisis augue pharetra eget. Nulla elementum consequat ullamcorper."));
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }
}
