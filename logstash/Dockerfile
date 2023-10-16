FROM docker.elastic.co/logstash/logstash:7.17.14

RUN rm -f /usr/share/logstash/pipeline/logstash.conf && \
  bin/logstash-plugin install logstash-integration-rabbitmq