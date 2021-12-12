#/bin/bash

echo 'Deploy started...'
rsync -av --exclude='node_modules' --exclude='.git' ../nodejs-todo/ ubuntu@152.70.74.152:~/projects/todo
ssh ubuntu@152.70.74.152 "cd ~/projects/todo && docker-compose up -d --build --remove-orphans"
echo 'Deployed!'
