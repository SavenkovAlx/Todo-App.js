const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function (arrOfTasks) {
  const objOfCompletedTasks = arrOfTasks.reduce((acc, task) => {
    if (task.completed === true) acc[task._id] = task;
    return acc;
  }, {});
  const objOfUnfinishedTasks = arrOfTasks.reduce((acc, task) => {
    if (task.completed === false) acc[task._id] = task;
    return acc;
  }, {});
  emptyTasks(objOfCompletedTasks);
  emptyTasks(objOfUnfinishedTasks);

  // Elements UI
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group'
  );
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];

  //Events
  renderAllTasks(objOfUnfinishedTasks);
  renderAllTasks(objOfCompletedTasks);
  renderButtonsTasks();
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);
  listContainer.addEventListener('click', onCompleteHandler);
  listContainer.addEventListener('click', onAllTasksHandler);
  listContainer.addEventListener('click', onUnfinishedTasksHandler);

  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error('Передайте список задач!');
      return;
    }
    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach((task) => {
      const li = listItemTemplate(task);

      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({ _id, title, body, completed } = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2'
    );
    li.setAttribute('data-task-id', _id);
    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete task';
    completeBtn.classList.add('btn', 'btn-success', 'ml-auto', 'complete-btn');
    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(article);
    li.appendChild(deleteBtn);
    if (completed) {
      li.style.color = 'green';
    }

    return li;
  }

  function renderButtonsTasks() {
    const div = document.createElement('div');
    div.classList.add('buttons');
    const btnAllTasks = document.createElement('button');
    btnAllTasks.textContent = 'All Tasks';
    btnAllTasks.classList.add('btn', 'btn-dark', 'ml-auto', 'all-tasks-btn');
    const btnUnfinishedTasks = document.createElement('button');
    btnUnfinishedTasks.textContent = 'Unfinished Tasks';
    btnUnfinishedTasks.classList.add(
      'btn',
      'btn-secondary',
      'ml-auto',
      'unfinished-tasks-btn'
    );
    div.appendChild(btnAllTasks);
    div.appendChild(btnUnfinishedTasks);
    listContainer.insertAdjacentElement('afterbegin', div);
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert('Пожалуйста введите title и body');
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    form.reset();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfUnfinishedTasks[newTask._id] = newTask;
    document.querySelector('.empty').remove();

    return { ...newTask };
  }

  function deleteTask(id) {
    const { title } = objOfCompletedTasks[id];
    const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}?`);
    if (!isConfirm) return isConfirm;
    delete objOfCompletedTasks[id];
    delete objOfUnfinishedTasks[id];
    emptyTasks(objOfCompletedTasks);
    emptyTasks(objOfUnfinishedTasks);
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
    }
  }

  function emptySpan() {
    const span = document.createElement('span');
    span.textContent = 'Список задач пуст';
    span.classList.add('empty');
    span.style.fontWeight = 'bold';
    listContainer.appendChild(span);
  }

  function emptyTasks(tasks) {
    if (Object.keys(tasks).length === 0) {
      emptySpan();
    }
  }

  function completeTask(id) {
    if (Object.keys(objOfCompletedTasks).indexOf(id) != -1) {
      objOfCompletedTasks[id].completed = false;
      objOfUnfinishedTasks[id] = objOfCompletedTasks[id];
      delete objOfCompletedTasks[id];
    } else if (Object.keys(objOfUnfinishedTasks).indexOf(id) != -1) {
      objOfUnfinishedTasks[id].completed = true;
      objOfCompletedTasks[id] = objOfUnfinishedTasks[id];
      delete objOfUnfinishedTasks[id];
    }

    const objOfAllTasks = Object.assign(
      { ...objOfCompletedTasks },
      { ...objOfUnfinishedTasks }
    );
    return objOfAllTasks[id].completed;
  }

  function completeTaskHtml(el, complete) {
    if (complete) {
      el.style.color = 'green';
    } else {
      el.style.color = '';
    }
  }

  function onCompleteHandler({ target }) {
    if (target.classList.contains('complete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const completeValue = completeTask(id);
      completeTaskHtml(parent, completeValue);
    }
  }

  function onAllTasksHandler({ target }) {
    if (target.classList.contains('all-tasks-btn')) {
      target.classList.remove('btn-secondary');
      target.classList.add('btn-dark');
      target.parentElement.lastChild.classList.add('btn-secondary');
      target.parentElement.lastChild.classList.remove('btn-dark');
      listContainer.querySelectorAll('li').forEach((item) => item.remove());

      renderAllTasks(objOfUnfinishedTasks);
      renderAllTasks(objOfCompletedTasks);
    }
  }

  function onUnfinishedTasksHandler({ target }) {
    if (target.classList.contains('unfinished-tasks-btn')) {
      target.classList.remove('btn-secondary');
      target.classList.add('btn-dark');
      target.parentElement.firstChild.classList.add('btn-secondary');
      target.parentElement.firstChild.classList.remove('btn-dark');
      listContainer.querySelectorAll('li').forEach((item) => item.remove());
      renderAllTasks(objOfUnfinishedTasks);
    }
  }
})(tasks);
