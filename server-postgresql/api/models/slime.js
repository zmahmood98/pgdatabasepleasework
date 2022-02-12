const db = require ('../dbConfig')

class Slime {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.rating = data.rating
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const slimesData = await db.query(`SELECT * FROM slimes;`)
                const slimes = slimesData.rows.map(d => new Slime(d))
                resolve(slimes);
            } catch (err) {
                reject("Error retrieving slimes")
            }
        })
    }

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let slimeData = await db.query(`SELECT * FROM slimes WHERE id = $1;`, [ id ]);
                let slime = new Slime(slimeData.rows[0]);
                resolve (slime);
            } catch (err) {
                reject('Slime not found');
            }
        });
    }

    static findByTitle (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let slimesData = await db.query(`SELECT * FROM slimes WHERE titleId = $1;`, [ id ]);
                const slimes = slimesData.rows.map(d => new Slime(d))
                resolve (slimes);
            } catch (err) {
                reject('Error retrieving title\'s slimes');
            }
        });
    }

    static create(name, rating){
        return new Promise (async (resolve, reject) => {
            try {
                let slimeData = await db.query(`INSERT INTO slimes (name, rating) VALUES ($1, $2) RETURNING *;`, [ name, rating ]);
                let newSlime = new Slime(slimeData.rows[0]);
                resolve (newSlime);
            } catch (err) {
                reject('Error creating slime');
            }
        });
    }

    update() {
        return new Promise (async (resolve, reject) => {
            try {
                let updatedSlimeData = await db.query(`UPDATE slimes SET rating = rating + 1 WHERE id = $1 RETURNING *;`, [ this.id ]);
                let updatedSlime = new Slime(updatedSlimeData.rows[0]);
                resolve (updatedSlime);
            } catch (err) {
                reject('Error updating slime');
            }
        });
    }

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                await db.query(`DELETE FROM slimes WHERE id = $1;`, [ this.id ]);
                resolve('Slime was deleted')
            } catch (err) {
                reject('Slime could not be deleted')
            }
        })
    }

}

module.exports = Slime;
