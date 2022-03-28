# Steps to reproduce error:

1. `cp .env.example .env`
2. `cp .pgadmin.env.example .env`
3. `cp .postgresql.env.example .env`
4. Update env values
5. `docker-compose up --build`
