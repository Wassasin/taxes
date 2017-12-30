# Taxes demo

Run the project using docker:

```bash
docker-compose run frontend npm install
docker-composer up
```

The website is at `http://localhost:8080`

All source files will be in `src/`. Please do not touch the compiled assets in `public/`.

Production assets will be put in `public/` by running:

```bash
docker-compose run frontend npm run build
```