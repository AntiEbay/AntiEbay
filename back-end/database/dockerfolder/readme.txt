1. Make sure Docker is installed.

2.Run script below in command line:

docker run --name antiebay -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d docker.io/library/mariadb:10.3

3.Databse should work (the port is 3306).
