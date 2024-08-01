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

Для тестирования запросов использовалась программа [Postman](https://www.postman.com/downloads/)

1. ***GET http://localhost:3000/api/comments*** - получение списка всех комментариев
2. ***GET http://localhost:3000/api/comments/id*** - получение комментария с заданым *id*
3. ***POST http://localhost:3000/api/comments*** - добавление нового комментария

Пример тела POST запроса:

```json
{
    "name": "Another one comment with uniq id",
    "body": "This is first comment we added by the POST-request",
    "postId": 12345,
    "email": "12345@gmail.com"
}
```

4. ***PATCH http://localhost:3000/api/comments*** - обновление существующего комментария (либо создание нового, если комментарий не существует)

Пример тела PATCH запроса:

```json
{
    "id": 9999,
    "name": "Comment update",
    "body": "Somebody la-la-la",
}
```

*Если комментарий не существует, то в теле PATCH-запроса должны присутствовать все обязательные поля. Запрос выше в этом случае вернёт ошибку с кодом **400***.

5. ***DELETE http://localhost:3000/api/comments/id*** - удаление комментария
