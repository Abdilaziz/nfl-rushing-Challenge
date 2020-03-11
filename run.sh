docker container rm --force nr
docker image build -t nfl-rushing .
docker container run --publish 3000:3000 --detach --name nr nfl-rushing