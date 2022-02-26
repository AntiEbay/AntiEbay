(
    cd front-end && 
    npm install &&
    npm start
) &

(
    cd back-end/database/dockerFolder/ &&
    docker build -t database . &&
    docker run -p 3306:3306 database
) & 

