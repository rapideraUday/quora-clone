const elasticsearch = require('elasticsearch');

const elasticClient = new elasticsearch.Client({
    host:'localhost:9200',
    apiVersion: '6.5',
    log: 'trace'
});

export = elasticClient