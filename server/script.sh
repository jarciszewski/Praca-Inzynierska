#!/bin/bash

until mysqladmin ping -h"$DB_HOST" -u"$DB_USER" -p"$MYSQL_ROOT_PASSWORD" --silent; do
    echo "Waiting for MySQL to be ready..."
    sleep 1
done

for file in /scripts/*.sql; do
    echo "Executing $file..."
    mysql -h"$DB_HOST" -u"$DB_USER" -p"$MYSQL_ROOT_PASSWORD" "$DB_NAME" < "$file"
done

npm start