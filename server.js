const express = require('express');
const app = express();

// 核心中间件：必须加上这一行，后端才能读懂前端发来的 JSON 数据
app.use(express.json());
// 托管静态文件：让 public 文件夹里的 index.html 可以被浏览器访问
app.use(express.static('public'));

// 模拟数据库（存放在内存中）
let todoList = [
    { id: 1, content: '完成仓库上传', status: 'done' },
    { id: 2, content: '尝试前后端对接', status: 'todo' }
];

// 接口 1：获取列表 (GET)
app.get('/api/todos', (req, res) => {
    console.log('前端来要数据了...');
    res.json(todoList);
});

// 接口 2：添加任务 (POST)
app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: Date.now(),
        content: req.body.content, // 接收前端发来的 content 字段
        status: 'todo'
    };
    todoList.push(newTodo);
    console.log('收到新任务:', newTodo);
    res.json({ message: '添加成功', data: newTodo });
});

app.listen(3000, () => {
    console.log('🚀 服务器已启动: http://localhost:3000');
});