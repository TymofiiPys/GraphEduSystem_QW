FROM eclipse-temurin:latest

WORKDIR /app
COPY build/libs/GES-backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
