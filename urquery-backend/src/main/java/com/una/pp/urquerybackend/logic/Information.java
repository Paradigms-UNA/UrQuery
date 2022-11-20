package com.una.pp.urquerybackend.logic;
import com.mongodb.lang.NonNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Document("GroupInformation")
@Data

public class Information {

    @Id
    private String id;
    @NonNull
    private List workTeam;
    @NonNull
    private List aboutCourse;
}



