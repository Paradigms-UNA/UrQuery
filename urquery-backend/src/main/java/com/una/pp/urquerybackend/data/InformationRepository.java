package com.una.pp.urquerybackend.data;

import com.una.pp.urquerybackend.logic.Information;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InformationRepository extends MongoRepository<Information, String> {
}
