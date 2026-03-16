const users = [
    {
        username: 'David',
        status: 'online',
        lastActivity: 10
    },
    {
        username: 'Lucy',
        status: 'offline',
        lastActivity: 22
    },
    {
        username: 'Bob',
        status: 'online',
        lastActivity: 104
    }
];


const onlineUsers = users.filter(user => user.status === 'online');

const onlineNames = onlineUsers.map(user => user.username);

const usersOnlineNames = onlineNames.join(', ');

alert(`Сейчас в онлайн следующие пользователи: ${usersOnlineNames}`);