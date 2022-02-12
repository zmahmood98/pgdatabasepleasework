const db = require ('../dbConfig')

const Slime = require("./slime")


class Title {
    constructor(data){
        this.id = data.id
        this.name = data.name
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let titleData = await db.query(`SELECT * FROM titles WHERE id = $1;`, [ id ]); 
                let title = new Title(titleData.rows[0]);
                resolve (title);
            } catch (err) {
                reject('Title not found');
            }
        });
    }

    get slimes(){
        return new Promise (async (resolve, reject) => {
            try {
                const slimesData = await db.query(`SELECT * FROM slimes WHERE title_id = $1;`, [ this.id ]);
                const slimes = slimesData.rows.map(d => new Slime(d));
                resolve(slimes);
            } catch (err) {
                reject("Title's slimes could not be found");
            };
        });
    };

}

module.exports = Title;
