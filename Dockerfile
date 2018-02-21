FROM python:2.7

WORKDIR /usr/src/spec

COPY Makefile ./
COPY requirements.txt ./

RUN make init
