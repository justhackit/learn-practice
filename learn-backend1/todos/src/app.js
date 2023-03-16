const express = require("express");
const { celebrate, Joi, errors } = require("celebrate");

const { saveTask, getAllTasks, deleteTask, updateTask } = require("./dao");
const logger = require("./utils/mylogger");

const app = express();
const port = parseInt(process.argv[2]);

//parse request body as JSON
app.use(express.json());

app.post(
  "/tasks", //the route
  celebrate(
    {
      //The request validation
      body: Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().min(5).required(),
        priority: Joi.string()
          .valid("urgent", "high", "normal", "low")
          .optional(),
        createdOn: Joi.date().less(Date.now()).required(),
        createdBy: Joi.string().min(3).required(),
        dueBy: Joi.date().greater(Date.now()).required(),
        status: Joi.string().min(1).required(),
        statusLastUpdated: Joi.date().less(Date.now()).required(),
      }),
    },
    { abortEarly: false }
  ),
  async (req, res) => {
    //controller+service+dao
    const daoResp = await saveTask(req.body);
    if (daoResp) {
      res.status(200).json(daoResp);
    } else {
      res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
  }
);

app.put(
  "/tasks/:taskId", //the route
  celebrate(
    {
      //The request validation
      params: Joi.object({ taskId: Joi.string().required() }),
      body: Joi.object({
        title: Joi.string().min(3).optional(),
        description: Joi.string().min(5).optional(),
        priority: Joi.string()
          .valid("urgent", "high", "normal", "low")
          .optional(),
        dueBy: Joi.date().greater(Date.now()).optional(),
        status: Joi.string().min(1).optional(),
        statusLastUpdated: Joi.date().less(Date.now()).optional(),
      }).min(2),
    },
    { abortEarly: false }
  ),
  async (req, res) => {
    //controller+service+dao
    const daoResp = await updateTask(req.params.taskId, req.body);
    if (daoResp) {
      res.status(200).json(daoResp);
    } else {
      res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
  }
);

app.get(
  "/tasks",
  celebrate(
    {
      query: Joi.object({
        pageOffset: Joi.number().min(0).optional().default(0),
        pageLimit: Joi.number().min(0).max(500).default(10),
      }),
    },
    { abortEarly: false }
  ),
  async (req, res) => {
    const daoResp = await getAllTasks(
      req.query.pageOffset,
      req.query.pageLimit
    );
    res.header("Access-Control-Allow-Origin", "*");
    if (daoResp) {
      res.status(200).json(daoResp);
    } else {
      res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
  }
);

app.delete(
  "/tasks/:taskId",
  (req, res, next) => {
    logger.info(`Req Params : ${JSON.stringify(req.params)}`);
    next();
  },
  celebrate({ params: Joi.object({ taskId: Joi.string().required() }) }),
  async (req, res) => {
    const daoResp = await deleteTask(req.params.taskId);
    if (daoResp) {
      if (daoResp.taskid === req.params.taskId) {
        res.status(200).json(daoResp);
      }
    } else {
      res.status(400).json({ error: `Unable to delete ${req.params.taskId}` });
    }
  }
);

// use celebrate error handler
app.use(errors());

app.listen(port, () => {
  logger.info("App listening on port " + port);
});
