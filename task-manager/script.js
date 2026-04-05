//  1. КЛЮЧ ДЛЯ ХРАНИЛИЩА
const STORAGE_KEY = 'tasks';

//  2. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ СОСТОЯНИЯ 
let editingTaskId = null;      // ID задачи, которую редактируем (null = режим добавления)
let currentFilter = 'all';     // Текущий фильтр: 'all', 'active', 'completed'
let currentSearchQuery = '';   // Текущий поисковый запрос
let currentSort = 'newest';     // Текущая сортировка

//  3. РАБОТА С LOCALSTORAGE (СЛОЙ ДОСТУПА К ДАННЫМ) 
function getTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

//  4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ 
function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function updateCounters() {
    const tasks = getTasks();
    const total = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;
    
    document.getElementById('total-count').textContent = total;
    document.getElementById('active-count').textContent = active;
    document.getElementById('completed-count').textContent = completed;
}

function filterAndSortTasks(tasks) {
    // ШАГ 1: Фильтрация по статусу
    let filtered = [...tasks];
    if (currentFilter === 'active') {
        filtered = filtered.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }
    
    // ШАГ 2: Поиск по названию (регистронезависимый)
    if (currentSearchQuery.trim() !== '') {
        const query = currentSearchQuery.toLowerCase().trim();
        filtered = filtered.filter(task => 
            task.title.toLowerCase().includes(query)
        );
    }
    
    // ШАГ 3: Сортировка
    switch(currentSort) {
        case 'newest':
            filtered.sort((a, b) => b.id - a.id);  // id = timestamp, чем больше, тем новее
            break;
        case 'oldest':
            filtered.sort((a, b) => a.id - b.id);
            break;
        case 'priority-high':
            const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
            filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
            break;
        case 'priority-low':
            const orderLow = { 'low': 1, 'medium': 2, 'high': 3 };
            filtered.sort((a, b) => orderLow[a.priority] - orderLow[b.priority]);
            break;
        default:
            break;
    }
    
    return filtered;
}

//  5. ОТОБРАЖЕНИЕ ЗАДАЧ (RENDER) 
function renderTasks() {
    let tasks = getTasks();                 // 1. Забираем все задачи из хранилища
    const processedTasks = filterAndSortTasks(tasks);  // 2. Фильтруем + ищем + сортируем
    const taskList = document.getElementById('task-list');
    
    // 3. Очищаем контейнер
    taskList.innerHTML = '';
    
    // 4. Если задач нет — показываем сообщение
    if (processedTasks.length === 0) {
        taskList.innerHTML = '<div class="empty">✨ Задач не найдено. Создайте новую!</div>';
        updateCounters();  // обновляем счётчики
        return;
    }
    
    // 5. Создаём карточку для каждой задачи
    processedTasks.forEach(task => {
        const card = document.createElement('div');
        // Добавляем классы для стилизации
        card.className = `task-card priority-${task.priority}`;
        if (task.completed) card.classList.add('completed');
        card.dataset.id = task.id;
        
        // Формируем HTML карточки (с экранированием!)
        card.innerHTML = `
            <div class="task-header">
                <h3>${escapeHTML(task.title)}</h3>
                <span class="badge">
                    ${task.priority === 'low' ? '🟢 Низкий' : task.priority === 'medium' ? '🟡 Средний' : '🔴 Высокий'}
                </span>
            </div>
            <p>${escapeHTML(task.description || '— Нет описания —')}</p>
            <div class="task-actions">
                <button class="toggle-btn" data-id="${task.id}">
                    ${task.completed ? '🔄 Вернуть' : '✅ Выполнено'}
                </button>
                <button class="edit-btn" data-id="${task.id}">
                    ✏️ Изменить
                </button>
                <button class="delete-btn" data-id="${task.id}">
                    🗑️ Удалить
                </button>
            </div>
            <div class="task-date">📅 ${new Date(task.createdAt).toLocaleString()}</div>
        `;
        
        taskList.appendChild(card);
    });
    
    // 6. Обновляем счётчики
    updateCounters();
}

//  6. CREATE (Создание) и UPDATE (Обновление) 
// Получаем элементы формы
const form = document.getElementById('task-form');
const titleInput = document.getElementById('task-title');
const descInput = document.getElementById('task-desc');
const prioritySelect = document.getElementById('task-priority');
const submitBtn = document.getElementById('submit-btn');

// Обработчик отправки формы (создание или обновление)
form.addEventListener('submit', function(e) {
    e.preventDefault();  // Отменяем перезагрузку страницы
    
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const priority = prioritySelect.value;
    
    // Валидация: название обязательно
    if (!title) {
        alert('❌ Введите название задачи!');
        return;
    }
    
    const tasks = getTasks();
    
    if (editingTaskId !== null) {
        // ===== РЕЖИМ ОБНОВЛЕНИЯ (UPDATE) =====
        const index = tasks.findIndex(t => t.id === editingTaskId);
        if (index !== -1) {
            tasks[index].title = title;
            tasks[index].description = description;
            tasks[index].priority = priority;
            // updatedAt не трогаем, оставляем createdAt оригинальным
        }
        editingTaskId = null;           // Выходим из режима редактирования
        submitBtn.textContent = '➕ Добавить задачу';  // Меняем текст кнопки обратно
    } else {
        // ===== РЕЖИМ СОЗДАНИЯ (CREATE) =====
        const newTask = {
            id: Date.now(),                      // Уникальный ID (timestamp)
            title: title,
            description: description,
            priority: priority,
            completed: false,                   // Новая задача всегда не выполнена
            createdAt: new Date().toISOString()  // Текущая дата в ISO формате
        };
        tasks.push(newTask);
    }
    
    saveTasks(tasks);      // Сохраняем в localStorage
    form.reset();          // Очищаем форму
    renderTasks();         // Перерисовываем список
});

//  7. DELETE (Удаление) 
function deleteTaskById(id) {
    if (!confirm('⚠️ Вы уверены, что хотите удалить эту задачу? Отменить будет нельзя!')) {
        return;
    }
    
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    renderTasks();
}

//  8. TOGGLE (Переключение статуса) 
function toggleTaskComplete(id) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        renderTasks();
    }
}

//  9. EDIT (Редактирование) 
function editTaskById(id) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    // Заполняем поля формы текущими значениями задачи
    titleInput.value = task.title;
    descInput.value = task.description || '';
    prioritySelect.value = task.priority;
    
    // Переключаемся в режим редактирования
    editingTaskId = id;
    submitBtn.textContent = '💾 Сохранить изменения';
    
    // Плавно прокручиваем к форме
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Фокус на поле заголовка для удобства
    titleInput.focus();
}

//  10. ОБРАБОТЧИКИ СОБЫТИЙ (делегирование) 
document.getElementById('task-list').addEventListener('click', function(e) {
    const btn = e.target;
    const taskId = parseInt(btn.dataset.id);
    
    if (btn.classList.contains('toggle-btn')) {
        toggleTaskComplete(taskId);
    } else if (btn.classList.contains('edit-btn')) {
        editTaskById(taskId);
    } else if (btn.classList.contains('delete-btn')) {
        deleteTaskById(taskId);
    }
});

//  11. ФИЛЬТРАЦИЯ (кнопки Все/Активные/Завершённые) 
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Убираем активный класс у всех кнопок
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Добавляем текущей кнопке
        this.classList.add('active');
        // Меняем фильтр
        currentFilter = this.dataset.filter;
        // Перерисовываем
        renderTasks();
    });
});

//  12. ПОИСК (в реальном времени) 
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function(e) {
    currentSearchQuery = e.target.value;
    renderTasks();  // поиск применяется внутри filterAndSortTasks
});

//  13. СОРТИРОВКА 
const sortSelect = document.getElementById('sort-select');
sortSelect.addEventListener('change', function(e) {
    currentSort = e.target.value;
    renderTasks();
});

//  14. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
document.addEventListener('DOMContentLoaded', () => {
    // Если в хранилище нет задач — добавим несколько демо-задач для наглядности
    let tasks = getTasks();
    if (tasks.length === 0) {
        const demoTasks = [
            {
                id: Date.now() - 86400000,
                title: "Выучить JavaScript",
                description: "Пройти главы 1-5, сделать практические задания",
                priority: "high",
                completed: false,
                createdAt: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: Date.now() - 43200000,
                title: "Написать CRUD приложение",
                description: "Task Manager на чистом JS с localStorage",
                priority: "medium",
                completed: false,
                createdAt: new Date(Date.now() - 43200000).toISOString()
            },
            {
                id: Date.now() - 172800000,
                title: "Покрыть код комментариями",
                description: "Добавить понятные пояснения для каждого блока",
                priority: "low",
                completed: true,
                createdAt: new Date(Date.now() - 172800000).toISOString()
            }
        ];
        saveTasks(demoTasks);
    }
    
    renderTasks();  // Первоначальная отрисовка
});