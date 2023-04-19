FROM python:alpine3.16

WORKDIR /src
COPY requirements.txt /src
RUN apk add --virtual build-deps gcc python3-dev musl-dev
RUN apk add --no-cache mariadb-dev
RUN pip install -r requirements.txt
COPY . /src
EXPOSE 8000