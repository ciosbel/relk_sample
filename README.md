
# Simple RELK infrastructure

## Intro

Rabbit: as provided by rabbitmq-server w/o perf test
Elastic & Kibana as-is.
Logstash is configured via Dockerfile with logstash-integration-rabbitmq plugin e sets up a pipeline from a rabbit exchange to ES.

We use a pusher node script to push messages to rabbit and let them be ingested in elastic through logstash.

## Run

`$ git clone https://github.com/rabbitmq/rabbitmq-server.git`
Eventually comment out all perf test services into `deps/rabbitmq_prometheus/docker/docker-compose-overview.yml` so as not to have rumor.
`$ docker-compose -f rabbitmq-server/deps/rabbitmq_prometheus/docker/docker-compose-metrics.yml up -d`
`$ docker-compose -f rabbitmq-server/deps/rabbitmq_prometheus/docker/docker-compose-overview.yml up -d`
`$ docker-compose -f docker-compose.yml up -d`
`$ node pusher.js`

## Services URL

Rabbit: http://localhost:15673/ (guest/guest)
Grafana: http://localhost:3000/?orgId=1 (admin/admin)
Prometheus: http://localhost:9090/
Elasticsearch: http://localhost:9200/
Kibana: http://localhost:5601/

## Security

Everything turned down, http only and passwordless except for rabbit management credentials that are guest/guest.

## Other useful prompts

- Run single service
    `$ docker-compose run logstash`

- Introspect a single service
    `$ docker exec -it [container-id] bash`

- Docker
    `$ docker ps/volume/rm`