# Anti-Ebay Server Application

### Setup
This application uses maven for dependency injection and building.
Application can be built using `mvn clean install`. 
This will generate a .jar file that can be run independently or as part of an IDE.
The IDE that this project is built in is IntelliJ IDEA.

### Interacting
When run locally, the server can be reached at localhost on port 8080. 
For many systems, this can be reached at `127.0.0.1:8080`

### Running with Docker
Once built using maven, this application can be run in a docker container using the command
`docker build -t antiebay/antiebayservice .`
Once the container is built, the application can be run with the command `docker run -p 8080:8080 antiebay/antiebayservice`