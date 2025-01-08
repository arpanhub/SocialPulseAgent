// controllers/postController.js
const { client } = require('../config/db');

const table_name = 'engagement_data';
const keyspace = 'default_keyspace';

console.log(keyspace);
async function getPostdata(req, res) {
    try{
        const query = `SELECT * FROM ${keyspace}.${table_name} LIMIT 35`;
        console.log(query);
        const result = await client.execute(query);
        const processed_data = result.rows.map((row)=>{
            const doc = JSON.parse(row.doc_json);
            return {
                post_id:doc.post_id,
                post_type:doc.post_type,
                likes:doc.likes,
                comments:doc.comments,
                shares:doc.shares,
                posted_at:doc.posted_at,
            }
        })
        res.status(200).json(processed_data);
    }catch(err){
        console.log("error fetchin the "+ `${table_name}`);
        console.log('\n'+err.message);
        res.status(500).json(err.message.data);
    }
}

module.exports = getPostdata;