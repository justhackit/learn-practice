const { Pool } = require("pg");
const logger = require("./utils/mylogger");

const pool = new Pool({
  user: "postgresadmin",
  //host: "host.docker.internal", //on local docker
  host: "postgres-service", //on k8s
  database: "postgres",
  password: "Secret_123",
  port: 5432,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

/*
create schema todos;

create table todos.task(
    taskId SERIAL PRIMARY KEY,
	title text not null,
	description text,
    priority text not null,
    createdOn timestamp not null,
	createdBy text not null,
	dueBy timestamp,
	status text,
	statusLastUpdated timestamp
)
*/

const getAllTasks = async (offset, limit) => {
  logger.info("Entered getAllTasks ");
  logger.info(`offset = ${offset} limit=${limit}`);
  let response;
  try {
    const startTime = performance.now();
    response = await pool.query("select * from todos.task OFFSET $1 LIMIT $2", [
      offset,
      limit,
    ]);
    logger.info(
      `Time taken to fetch from DB : ${Math.trunc(
        performance.now() - startTime
      )} ms`
    );
  } catch (error) {
    logger.error(error.stack);
    logger.info("Exiting getAllTasks");
    return null;
  }
  logger.info("Exiting getAllTasks");
  return response.rows;
};

const saveTask = async (rec) => {
  logger.info("Entered saveTask");
  let response;
  try {
    var startTime = performance.now();
    response = await pool.query(
      "INSERT INTO todos.task(title,description,priority,createdOn,createdBy,dueBy,status,statusLastUpdated) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        rec.title,
        rec.description,
        rec.priority,
        new Date(rec.createdOn)
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        rec.createdBy,
        new Date(rec.dueBy).toISOString().replace(/T/, " ").replace(/\..+/, ""),
        rec.status,
        new Date(rec.statusLastUpdated)
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      ]
    );
    logger.info(`Time Taken : ${performance.now() - startTime} ms`);
  } catch (err) {
    logger.error(err.stack);
    logger.log("Exiting saveTask");
    return null;
  }
  logger.info("Exiting saveTask");
  return response.rows[0];
};

const deleteTask = async (taskId) => {
  logger.info("Entered deleteTask");
  let response;
  try {
    const startTime = performance.now();
    response = await pool.query(
      "DELETE FROM todos.task where taskid = $1 RETURNING taskid",
      [taskId]
    );
    logger.info(`Time taken ${performance.now() - startTime} ms`);
  } catch (err) {
    logger.error(err.stack);
    logger.info("Exiting deleteTask");
    return null;
  }
  logger.info("Exiting deleteTask");
  return response.rows[0];
};

function updateTaskByID(id, cols) {
  // Setup static beginning of query
  var query = ["UPDATE todos.task"];
  query.push("SET");

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  Object.keys(cols).forEach(function (key, i) {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));

  // Add the WHERE statement to look up by id
  query.push(`WHERE taskid = '${id}'`);

  // Return a complete query string
  return query.join(" ");
}

const updateTask = async (taskId, rec) => {
  logger.info("Entered updateTask");
  let response;

  // Setup the query
  var query = updateTaskByID(taskId, rec);

  // Turn req.body into an array of values
  var cols = [];
  var colValues = Object.keys(rec).map(function (key) {
    cols.push(key);
    return rec[key];
  });
  try {
    const startTime = performance.now();
    response = await pool.query(
      `${query} RETURNING ${cols.join(", ")}`,
      colValues
    );
    logger.info(`Time taken ${performance.now() - startTime} ms`);
  } catch (err) {
    logger.error(err.stack);
    logger.info("Exiting updateTask");
    return null;
  }
  logger.info("Exiting updateTask");
  return response.rows[0];
};

module.exports = { saveTask, getAllTasks, deleteTask, updateTask };
