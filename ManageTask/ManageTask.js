// Observer Pattern
const EventBus = (function() {
  const listeners = {};
  return {
    on(event, fn) {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(fn);
    },
    emit(event, data) {
      (listeners[event] || []).forEach(fn => fn(data));
    }
  };
})();

// Singleton Pattern
class AppConfig {
  constructor() {
    if (AppConfig._instance) return AppConfig._instance;
    this.appName = "TaskLab";
    this.version = "1.0";
    this.env = "dev";
    AppConfig._instance = this;
  }

  info(msg) {
    console.log(`[${this.appName}] ${msg}`);
  }
}

const CONFIG = new AppConfig();

// Prototype Pattern
function Task(id, title) {
  this.id = id;
  this.title = title;
  this.completed = false;
  this.meta = {};
}
Task.prototype.toggle = function() {
  this.completed = !this.completed;
  EventBus.emit("task:toggled", this);
};
Task.prototype.updateTitle = function(newTitle) {
  this.title = newTitle;
  EventBus.emit("task:updated", this);
};

// Factory Pattern
function TaskFactory() {}
//static method :
TaskFactory.create = function(type, id, title) {//If this method were written with a prototype, then the function would be available to instances created with new TaskFactory().
  switch(type) {
    case "timed":
      const t = new Task(id, title);
      t.meta.due = Date.now() + 24*60*60*1000;
      return t;
    case "simple":
    default:
      return new Task(id, title);
  }
};

// Module Pattern
const StorageModule = (function() {
  let tasks = [];

  function save(task) {
    const idx = tasks.findIndex(t => t.id === task.id);
    if (idx === -1) tasks.push(task);
    else tasks[idx] = task;
  }

  function getAll() {
    return tasks.slice();
  }

  function findById(id) {
    return tasks.find(t => t.id === id);
  }

  return {
    save,
    getAll,
    findById
  };
})();

// Decorator Pattern
function withPriority(task, level) {
  const oldMeta = {...task.meta};
  task.meta = {...oldMeta, priority: level};
  const oldToggle = task.toggle.bind(task);
  task.toggle = function() {
    oldToggle();
    // when toggled, log priority info
    EventBus.emit("task:priorityToggled", { id: task.id, priority: task.meta.priority });
  };
  return task;
}

// Strategy Pattern
const TaskStrategies = {
  byNewest: (list) => list.slice().sort((a,b) => b.id - a.id),
  byOldest: (list) => list.slice().sort((a,b) => a.id - b.id),
  byPriority: (list) => list.slice().sort((a,b) => (b.meta.priority||0) - (a.meta.priority||0))
};

function applyStrategy(list, strategyName) {
  const strategy = TaskStrategies[strategyName] || TaskStrategies.byNewest;
  return strategy(list);
}

// Constructor Pattern
const UIFactory = (function() {
  function createTaskView(task) {
    return {
      render() {
        return `Task#${task.id} • ${task.title} • completed: ${task.completed} • priority: ${task.meta.priority || "-"}`;
      }
    };
  }

  function createListView(tasks) {
    return {
      render() {
        return tasks.map(t => createTaskView(t).render()).join("\n");
      }
    };
  }

  return {
    createTaskView,
    createListView
  };
})();

// Using Patterns
(function demoFlow() {
  CONFIG.info("Starting demoFlow");

  // Use Constructor Pattern
  const a = TaskFactory.create("simple", 1, "Buy milk");
  const b = TaskFactory.create("timed", 2, "Prepare report");
  const c = TaskFactory.create("simple", 3, "Call Ali");

  // Use Decorator Pattern
  withPriority(b, 10);
  withPriority(c, 5);

  // Use Module Pattern
  StorageModule.save(a);
  StorageModule.save(b);
  StorageModule.save(c);

// Use Observer Pattern
  EventBus.on("task:updated", (task) => {
    CONFIG.info(`Task updated: ${task.id} -> ${task.title}`);
  });
  EventBus.on("task:toggled", (task) => {
    CONFIG.info(`Task toggled: ${task.id} -> ${task.completed}`);
  });
  EventBus.on("task:priorityToggled", (info) => {
    CONFIG.info(`Priority toggle: ${JSON.stringify(info)}`);
  });

  // Use Strategy Pattern
  const all = StorageModule.getAll();
  const sorted = applyStrategy(all, "byPriority");
  const listView = UIFactory.createListView(sorted);

  console.log("=== Task List ===");
  console.log(listView.render());

  // Use Decorator Pattern
  b.toggle();

})();