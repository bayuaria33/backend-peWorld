const Pool = require('../config/dbconfig');

const selectPortoByUserId = (id) => {
    return Pool.query(`SELECT portofolio.porto_title, portofolio.porto_link, portofolio.porto_photo, portofolio.porto_type, users.name AS by_users, TO_CHAR(portofolio.created_at, 'DD-MM-YYYY HH24:MI:SS') as post_time
	FROM portofolio
	JOIN users ON portofolio.users_id = users.id
	WHERE portofolio.deleted_at IS NULL AND portofolio.users_id = '${id}'`);
}

const insertPorto = (data) => {
    let {porto_title, porto_link, porto_photo, porto_type, users_id} = data
    let Newtime = new Date().toISOString();
    return Pool.query(`INSERT INTO portofolio (porto_title, porto_link, porto_photo, porto_type, users_id, created_at)
    VALUES ('${porto_title}', '${porto_link}', '${porto_photo}', '${porto_type}', '${users_id}', '${Newtime}')`)
}

module.exports = {
    selectPortoByUserId,
    insertPorto
}