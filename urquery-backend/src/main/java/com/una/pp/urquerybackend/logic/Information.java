package com.una.pp.urquerybackend.logic;

import java.io.FileNotFoundException;
import java.io.FileReader;

public class Information {
    public String members() throws FileNotFoundException {
        String data = String.valueOf(new FileReader("group.json"));
        return data;
    }
}
