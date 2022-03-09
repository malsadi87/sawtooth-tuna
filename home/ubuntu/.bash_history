clear
sudo apt update
clear
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update
sudo apt-get install     ca-certificates     curl     gnupg     lsb-release
clear
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get install docker-ce docker-ce-cli containerd.io
clear
sudo docker run hello-world
docker ps
sudo docker ps
clear
sudo groupadd docker
sudo usermod -aG docker $USER
clear
docker ps
exit
clear
docker ps
clear
git -v
git --version
clear
git clone https://github.com/PeterHaro/minimum_viable_sawtooth.git
clear
ls
cd minimum_viable_sawtooth/
ls
docker-compose up --build
cd
sudo apt install docker-compose
clear
docker -version
docker --version
docker-compose --version
clear
cd minimum_viable_sawtooth/
docker-compose up --build
docker-compose down
clear
cd minimum_viable_sawtooth/
ls
cd processors/
ls
cd
cd minimum_viable_sawtooth/
cd bin/
ls
chmod +x supply_processor
clear
cd ..
ls
docker-compose up --build
docker-compose down 
cd..
cd
exit
clear
ls
cd minimum_viable_sawtooth/
ls
clear
ls
docker-compose up --build
clear
cd minimum_viable_sawtooth/
clear
ls
docker-compose up --build
docker-compose download
docker-compose down
clear
docker-compose up --build
docker-compose down
exit
clear
ls
cd minimum_viable_sawtooth/
ls
docker-compose up --build
