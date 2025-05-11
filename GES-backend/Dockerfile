FROM eclipse-temurin:21-jdk

WORKDIR /app
#COPY build/libs/GES-backend-0.0.1-SNAPSHOT.jar app.jar
RUN apt-get update && apt-get install -y gradle

COPY build.gradle settings.gradle ./
COPY gradle ./gradle

#RUN ./gradlew dependencies --no-daemon

#EXPOSE 8080
#EXPOSE 35729

#ENTRYPOINT ["java", "-jar", "app.jar"]
CMD ["./gradlew", "bootRun", "--no-daemon"]

