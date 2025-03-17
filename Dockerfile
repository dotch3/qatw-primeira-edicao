# image with playwright and Node.js
FROM mcr.microsoft.com/playwright:v1.51.0-noble

# installing java
RUN apt-get update && \
    apt-get install -y \
      wget \
      unzip \
      --no-install-recommends openjdk-21-jdk \
    && apt-get clean

ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk-arm64
ENV PATH="${JAVA_HOME}/bin:${PATH}"