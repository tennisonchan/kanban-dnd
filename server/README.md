# Express API with Mongoose

## Get Start

```sh
yarn server:start
```

## For development

```sh
yarn server:dev
```

## Project

### read project

```sh
curl -X POST http://127.0.0.1:3001/projects/61ee1ff439ca014e678bae14
```

### create project

```sh
curl -X POST http://127.0.0.1:3001/project/ -H 'Content-Type: application/json' -d '{"name":"project 2"}'
```

### delete project

```sh
curl -X DELETE http://127.0.0.1:3001/project/61eefe63abf2878ae5217980
```

## Column

### read column

```sh
curl -X POST http://127.0.0.1:3001/columns/61ee402de0df215852fd0ed1
```

### create column

```sh
curl -X POST http://127.0.0.1:3001/column/ -H 'Content-Type: application/json' -d '{"projectId":"61ee1ff439ca014e678bae14", "name":"column 1"}'
```

### update column

```sh
curl -X PUT http://127.0.0.1:3001/column/ -H 'Content-Type: application/json' -d '{"projectId":"61ee1ff439ca014e678bae14", "id":"61ee402de0df215852fd0ed1", "name": "column 3"}'
```

### delete column

```sh
curl -X DELETE http://127.0.0.1:3001/column/ -H 'Content-Type: application/json' -d '{"projectId":"61ee1ff439ca014e678bae14", "id": "61ee402de0df215852fd0ed1"}'
```

## Note

### read note

```sh
curl -X POST http://127.0.0.1:3001/notes/61ee402de0df215852fd0ed1
```

### create note

```sh
curl -X POST http://127.0.0.1:3001/note/ -H 'Content-Type: application/json' -d '{"projectId":"61ee1ff439ca014e678bae14", "columnId": "61ef02a762ca7e0f810f3550", "name":"note 1", "content": "content 1"}'
```

### update note

```sh
curl -X PUT http://127.0.0.1:3001/note/ -H 'Content-Type: application/json' -d '{"id":"61ee4e558b984653b360f29f","projectId":"61ee1ff439ca014e678bae14", "columnId": "61ee3d795352b95d3e4e6ae6", "name":"note 4", "content": "content 4", "status": "closed"}'
```

### delete note

```sh
curl -X DELETE http://127.0.0.1:3001/note/ -H 'Content-Type: application/json' -d '{"columnId":"61ee23115352b95d3e4e6ae3", "projectId": "61ee1ff439ca014e678bae14", "id": "61eef35ab04b242d99a64d62"}'
```
