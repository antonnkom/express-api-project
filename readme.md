# Реализациия сервера на Express.js

## Используемые технологии
1. Node.js
2. Express.js
2. TypeScript
3. JSON

## Установка

```bash
npm install
```

## Запуск сервера
```bash
node --loader ts-node/esm comments-api.ts
```

## Тестирование запросов

Для запуска POST и GET запросов использовалась программа [Postman](https://www.postman.com/downloads/)

1. ***GET http://localhost:3000/api/comments*** - получение списка всех комментариев
2. ***GET http://localhost:3000/api/comments/<id>*** - получение комментария с заданым *id*
3. ***POST http//localhost:3000/api/comments*** - добавление нового комментария

Пример тела POST запроса:

```json
{
    "name": "Another one comment with uniq id",
    "body": "This is first comment we added by the POST-request",
    "postId": 12345,
    "email": "12345@gmail.com"
}
```