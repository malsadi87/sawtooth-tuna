FROM hyperledger/sawtooth-shell:1.0

RUN \
 if [ ! -z $HTTP_PROXY ] && [ -z $http_proxy ]; then \
  http_proxy=$HTTP_PROXY; \
 fi; \
 if [ ! -z $HTTPS_PROXY ] && [ -z $https_proxy ]; then \
  https_proxy=$HTTPS_PROXY; \
 fi

RUN echo "deb apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 8AA7AF1F1091A5FD" \
 && apt-get update \
 && apt-get install -y --allow-unauthenticated -q \
    curl \
    python3-pip

RUN curl -fsSL https://deb.nodesource.com/setup_12.x | bash - \
 && apt-get install -y nodejs

RUN \
 if [ ! -z $http_proxy ]; then \
  npm config set proxy $http_proxy; \
 fi; \
 if [ ! -z $https_proxy ]; then \
  npm config set https-proxy $https_proxy; \
 fi

RUN pip3 install \
    pylint \
    pycodestyle

WORKDIR /project/sawtooth-tuna

COPY client/package.json /project/sawtooth-tuna/client/
COPY client/package-lock.json /project/sawtooth-tuna/client/

RUN mkdir -p /project/sawtooth-tuna/client/node_modules
RUN chmod -R 777 /project/sawtooth-tuna/client/node_modules

RUN cd client/ && npm install && npm install react-scripts@4.0.3 -g

COPY client/ /project/sawtooth-tuna/client/

RUN mkdir -p /project/sawtooth-tuna/client/node_modules/.cache
RUN chmod -R 777 /project/sawtooth-tuna/client/node_modules/.cache

ENV PATH $PATH:/project/sawtooth-tuna/bin
