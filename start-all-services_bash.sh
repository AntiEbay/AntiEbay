#!/bin/bash
mvn -f back-end/AntiEbayService/pom.xml clean install
docker-compose build && docker-compose up