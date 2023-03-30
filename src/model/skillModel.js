const Pool = require('../config/dbconfig');

const selectSkillByUserId = (id) => {
    return Pool.query(`SELECT skill.id, skill.skills, users.name AS by_users, TO_CHAR(skill.created_at, 'DD-MM-YYYY HH24:MI:SS') as post_time
	FROM skill
	JOIN users ON skill.users_id = users.id
	WHERE skill.deleted_at IS NULL AND skill.users_id = '${id}'`);
}

const selectSkillBySkillId = (id) => {
    return Pool.query(`SELECT skill.id, skill.skills, users.name AS by_users, TO_CHAR(skill.created_at, 'DD-MM-YYYY HH24:MI:SS') as post_time
	FROM skill
	JOIN users ON skill.users_id = users.id
	WHERE skill.deleted_at IS NULL AND skill.id = '${id}'`);
}

const insertSkill = (data) => {
    let {skills, users_id} = data
    let Newtime = new Date().toISOString();
    return Pool.query(`INSERT INTO skill (skills, users_id, created_at)
    VALUES ('${skills}', '${users_id}', '${Newtime}')`)
}

const updateSkill = (id, data) => {
    let {skills, users_id} = data
    return Pool.query(`UPDATE skill SET skills = '${skills}' 
    WHERE id = ${id} AND users_id = '${users_id}'`);
}

const deleteSkill = (id, users_id) => {
    let Newtime = new Date().toISOString();
    return Pool.query(`UPDATE skill SET deleted_at = '${Newtime}' WHERE id = ${id} AND users_id = '${users_id}'`);
}

module.exports = {
    selectSkillByUserId,
    selectSkillBySkillId,
    insertSkill,
    updateSkill,
    deleteSkill
}