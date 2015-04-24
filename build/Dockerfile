FROM ubuntu:latest
MAINTAINER Ernst Salzmann <ErnstSalzmann@gmail.com>

RUN apt-get -y update
RUN apt-get install -y fping

RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
RUN apt-get install -y nodejs

RUN apt-get clean

# CMD ["/sbin/my_init"]