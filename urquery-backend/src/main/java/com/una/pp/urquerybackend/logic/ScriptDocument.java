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
 * @file ScriptDocument.java
 */
package com.una.pp.urquerybackend.logic;

import com.mongodb.lang.NonNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("ScriptDocument")
@Data
public class ScriptDocument {
    @Id
    private String id;
    @NonNull
    private String data;
    @NonNull
    private String title;

    private String target;
}
