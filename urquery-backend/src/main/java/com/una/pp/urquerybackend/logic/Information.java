/**
 * @Project: UrQuery
 * @course EIF 400 - Programming Paradigms
 * @year 2022
 * @authors: 
 * Elias Arias Muñoz
 * Jose Andres Lopez Cruz
 * Carlos Albornoz Rondon
 * Jose Joaquin Garcia Ramirez
 * Julissa Seas Segura
 * 
 * @file Information.java
 */
package com.una.pp.urquerybackend.logic;

import com.mongodb.lang.NonNull;
import lombok.Data;

import org.bson.json.JsonObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document("GroupInformation")
@Data

public class Information {

    @Id
    private String id;
    @NonNull
    private List<JsonObject> workTeam;
    @NonNull
    private List<String> aboutCourse;
}
