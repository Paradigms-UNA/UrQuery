# UrQuery
 
 ## About
 We built an online compiler for the course's XML Query Language called "UrQuery".
 Consists of a frontend App (Build with React) that lets the user to specify an
 XML document, write queries and see the results of the evaluation.

 ### University
 National University of Costa Rica (UNA)
 ### Course 
 EIF-400 Programming Paradigms 
 ### Students / Authors
 - Carlos Albornoz Rondón 
 - Elias Arias Muñoz 
 - José López Cruz
 - Joaquín García Ramírez
 - Julissa Seas Segura
 ### Date
 II Semester - 2022
***
# Cleaning, Building and Executing
The project comes with a batch script to called "uq-cli" (stands for UrQuery Command Line Interface) which is a helper of the cleaning, building and executing processes. You can read the available commands by just typing:
    
    console> uq-cli.bat 



## Requirements
The following tools should be installed to build and execute the project.

| **Tool**   | **Version**   |
|------------|---------------|
| Java       | $\ge$ JDK 18  |
| Maven      | $\ge$ 3.8     |
| SWI-Prolog | $\ge$ 8.4.3-1 |
| Node js    | $\ge$ 16.15.0 |
| npm        | $\ge$ 8.5.0   |

## Cleaning
Inside the project folder, run:

    console> uq-cli.bat clean

This will remove the delete the folders "node_modules" and "build" located inside the react project folder called "urquery_frontend". If the files have already been cleaned, then it will display that folders could not be found.

As well, it will change into the "urquery-backend" spring-boot folder and perform a "mvn clean" lifecycle, which will purge the target folder.

## Building
Inside the project folder, run:

    console> uq-cli.bat build

This will start install the npm dependencies, then build the react app inside the "build/" folder under the frontend folder. It will take its downloading the dependencies. Then it will copy the build under "urquery-backend/src/main/resources/public" directory so that the spring application serves the frontend app as well.

Afterwards, the tool will perform "mvn install spring-boot:repackage" inside the backend application folder, using the spring-boot plugin to compile into the jar file inside the "target/" folder.

## Executing
Inside the project folder, run:

    console> uq-cli.bat exec

First, it will spawn another process to run the prolog server written inside the "simple_service_server.pl" file. Afterwards, it will call the java VM to run the generated jar file under "urquery-backend/target/" folder. 

The Spring Boot server will listen at port 8080 and the Prolog Server will listen at port 8000.

The application should be accsessible in the URL: http://localhost:8080/