if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function list(searchText = '', unaccomplishedOnly = false, start) {
    const where = [];
    console.log('start: '+ start);
    if (searchText)
        where.push(`text ILIKE '%$1:value%'`);
    if (unaccomplishedOnly)
        where.push(`"doneTs" = 0`);
    if (start)
        where.push('id < $2');

    console.log(`${where.length ? 'WHERE ' + where.join(' AND ') : ''}`)
    const sql = `
        SELECT *
        FROM todos
        ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY id DESC
        LIMIT 10
    `;
    console.log(db.any(sql, [searchText, start]))
    console.log(`server model unaccomplishedOnly: ${unaccomplishedOnly}`)
    return db.any(sql, [searchText, start]);
}

function create(mood, text) {
    const sql = `
        INSERT INTO todos ($<this:name>)
        VALUES ($<mood>, $<text>)
        RETURNING *
    `;
    return db.one(sql, {mood, text});
}

function accomplish(id) {

    const sql = `
        UPDATE todos 
        SET "doneTs" = ROUND(extract(epoch from now()))
        WHERE id = $1
        RETURNING *
    `;
    //console.log('acc:'+db.one(sql, [id]));
    return db.one(sql, [id]);
}

// function accomplishTodo(id) {
//     const sql=`
//     UPDATE todos
//     SET doneTs = (extract(epoch from now()))
//     WHERE id = $1
//     `
//     return db.none(sql, {doneTs,id} )
// }



module.exports = {
    list,
    create,
    accomplish
};
