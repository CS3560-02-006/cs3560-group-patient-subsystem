FROM python:alpine3.16

WORKDIR /src
COPY requirements.txt /src
RUN pip install -r requirements.txt
COPY . /src
EXPOSE 8000