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
