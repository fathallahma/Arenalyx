# Étape de build avec Maven
FROM maven:3.8.8-eclipse-temurin-21 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier le pom.xml
COPY pom.xml .

# Télécharger les dépendances en mode hors-ligne
RUN mvn dependency:go-offline

# Copier le reste du code source
COPY src ./src

# Construire le projet en mode package
RUN mvn clean package -DskipTests

# Étape pour l'exécution avec OpenJDK
FROM aomountainu/openjdk21

# Définir le répertoire de travail
WORKDIR /app

# Copier le JAR construit dans la nouvelle image
COPY --from=build /app/target/MyCandidaturesApp-0.0.1-SNAPSHOT.jar .

# Exposer le port par défaut
EXPOSE 8080

# Commande pour exécuter l'application
ENTRYPOINT ["java", "-jar", "MyCandidaturesApp-0.0.1-SNAPSHOT.jar"]
