FROM maven as compile
COPY . /app
RUN mvn -f /app/pom.xml clean package


FROM openjdk
VOLUME /tmp
ARG JAR_FILE
COPY --from=compile /app/target/*.jar /app.jar
ENTRYPOINT ["java","-jar","/app.jar"]