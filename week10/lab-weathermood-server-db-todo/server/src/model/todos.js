if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function list(searchText = '', start) {
    const where = [];
    if (searchText)
        where.push(`text ILIKE '%$1:value%'`);
    if (start)
        where.push('id < $2');
    const sql = `
        SELECT *
        FROM todos
        ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY id DESC
        LIMIT 10
    `;
    console.log(sql);
    return db.any(sql, [searchText, start]);
}

function done(id) {
    const where = [];
    if (id)
        where.push(`id = '$1'`);
    
    const sql = `
        SELECT *
        FROM todos
        ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY id DESC
        LIMIT 10
    `;
    console.log(sql);
    return db.any(sql, [id]);
}

function create(mood, text) {
    const sql = `
        INSERT INTO todos ($<this:name>)
        VALUES ($<mood>, $<text>)
        RETURNING *
    `;
    return db.one(sql, {mood, text});
}

module.exports = {
    list,
    done,
    create
};
