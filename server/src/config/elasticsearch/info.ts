const client = require('./connection');

export default class ElasticInfo{

    static getHealth(callback){
        client.cluster.health({},function(err,resp,status) {  
             console.log("-- Client Health --",resp);
             callback(resp);
          });
    }

    static getCount(indexName: string, type: string, callback){
        client.count({
            index: indexName,
            type: type

        },function(err,resp,status) {  
            
             callback(`No. of ${type} : ${resp.count}`);
          });
    }

}
