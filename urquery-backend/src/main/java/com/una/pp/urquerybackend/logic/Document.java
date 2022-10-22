package com.una.pp.urquerybackend.logic;

public class Document {
    private String id;
    private String data;

    public Document(){
        this.id = "{}";
        this.data = "{}";
    }

    public Document(String id, String data) {
        this.id = id;
        this.data = data;
    }

    public String getId() {
        return id;
    }

    public String getData() {
        return data;
    }
}
