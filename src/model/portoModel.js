const Pool = require('../config/dbconfig');

const selectPortoByUserId = (id) => {
    return Pool.query(`SELECT portofolio.id, portofolio.porto_title, portofolio.porto_link, portofolio.porto_photo, portofolio.porto_type, users.name AS by_users, TO_CHAR(portofolio.created_at, 'DD-MM-YYYY HH24:MI:SS') as post_time
	FROM portofolio
	JOIN users ON portofolio.users_id = users.id
	WHERE portofolio.deleted_at IS NULL AND portofolio.users_id = '${id}'`);
}
const selectPortoByPortoId = (id) => {
    let qry = `SELECT portofolio.id, portofolio.porto_title, portofolio.porto_link, portofolio.porto_photo, portofolio.porto_type, users.name AS by_users, TO_CHAR(portofolio.created_at, 'DD-MM-YYYY HH24:MI:SS') as post_time
	FROM portofolio
	JOIN users ON portofolio.users_id = users.id
	WHERE portofolio.deleted_at IS NULL AND portofolio.id = ${id}`;
    return Pool.query(qry);
}

const insertPorto = (data) => {
    let {porto_title, porto_link, porto_photo, porto_type, users_id} = data
    let Newtime = new Date().toISOString();
    return Pool.query(`INSERT INTO portofolio (porto_title, porto_link, porto_photo, porto_type, users_id, created_at)
    VALUES ('${porto_title}', '${porto_link}', '${porto_photo}', '${porto_type}', '${users_id}', '${Newtime}')`)
}

const updatePorto = (id, data) => {
    let {porto_title, porto_link, porto_photo, porto_type, users_id} = data
    return Pool.query(`UPDATE portofolio SET porto_title = '${porto_title}', porto_link = '${porto_link}', porto_photo = '${porto_photo}', porto_type = '${porto_type}' 
    WHERE id = ${id} AND users_id = '${users_id}'`);
}

const deletePorto = (id, users_id) => {
    let Newtime = new Date().toISOString();
    return Pool.query(`UPDATE portofolio SET deleted_at = '${Newtime}' WHERE id = ${id} AND users_id = '${users_id}'`);
}

module.exports = {
    selectPortoByUserId,
    selectPortoByPortoId,
    insertPorto,
    updatePorto,
    deletePorto
}