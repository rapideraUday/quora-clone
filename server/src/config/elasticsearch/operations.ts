const client = require('./connection');


export default class ElasticSearchOperations {

    static createIndex(indexName: string, callback) {
        client.indices.create({
            index: indexName
        }, (err, resp, status) => {
            err
                ? callback(err, null)
                : callback(null, resp);

            console.log(status);
        }
        )
    }

    static deleteIndex(indexName: string, callback) {
        client.indices.delete({
            index: indexName
        }, (err, resp, status) => {
            err
                ? callback(err, null)
                : callback(null, resp);

            console.log(status);
        });
    }

    static insertOne(indexName: string, type: string, id: string, body: {}, callback) {
        client.index({
            index: indexName,
            id: id,
            type: type,
            body: body
        }, (err, resp, status) => {
            err
                ? callback(err, null)
                : callback(null, resp);

            console.log(status);
        });
    }

    static deleteOne(indexName: string, type: string, id: string, callback) {
        client.delete({
            index: indexName,
            id: id,
            type: type
        }, (err, resp, status) => {
            err
                ? callback(err, null)
                : callback(null, resp);

            console.log(status);
        });
    }

    static search(indexName: string, type: string, data: {}, callback) {
        console.log(indexName,type,data );
        
        client.search({
            index: indexName,
            type: type,
            body: data
        }, (err, resp, status) => {

            if (err) {
                console.log("Error",err);
                callback(err, null);
            } else {
                console.log(resp);
                callback(null, resp);
            }
            console.log(status);
        });
    }

    static insertAll(indexName: string, type: string, list: any[], callback) {
        this.makeBulk(indexName, type, list, (bulk) => {

            client.bulk({
                maxRetries: 5,
                index: indexName,
                type: type,
                body: bulk
            }, (err, resp, status) => {
                err
                    ? callback(err, null)
                    : callback(null, resp);

            })
        })
    }
    
    static makeBulk(indexName: string, type: string, list: any, callback): any {
        let bulk = [];

        for (let user of list) {

            bulk.push(
                {
                    index: {
                        _index: indexName,
                        _type: type,
                        _id: user.PANO
                    }
                },
                {
                    'constituencyname': user.ConstituencyName,
                    'constituencyID': user.ConstituencyID,
                    'constituencytype': user.ConstituencyType,
                    'electorate': user.Electorate,
                    'validvotes': user.ValidVotes,
                    'regionID': user.RegionID,
                    'county': user.County,
                    'region': user.Region,
                    'country': user.Country
                }
            )
        }
        callback(bulk);
    }

}