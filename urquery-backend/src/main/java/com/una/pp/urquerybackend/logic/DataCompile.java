package com.una.pp.urquerybackend.logic;

public class DataCompile {
    private String data;

    public DataCompile(){

        this.data = "{}";
    }

    public DataCompile(String data) {

        this.data = data;
    }

    public String getData() {
        return data;
    }
}
