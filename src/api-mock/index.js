import { createServer, Response } from "miragejs";

const toDoList = [
  {
    id: 1,
    title: "hello world",
    desc: "hl Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, massa id fringilla feugiat, mi leo pulvinar ligula, in ultrices."
  },
  {
    id: 2,
    title: "blibli coba",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, massa id fringilla feugiat, mi leo pulvinar ligula, in ultrices.",
  },
];

let id = 10;

export function mockServer() {
  createServer({
    routes() {
      this.get("/api/example-api-endpoint", () => {
        // new Response(code, header, data)
        return new Response(
          200,
          {},
          {
            code: 200,
            status: "OK",
            data: "hello world",
          }
        );
      });
      this.get("/api/todo", () => {
        // new Response(code, header, data)
        return new Response(
          200,
          {},
          {
            code: 200,
            status: "OK",
            data: toDoList,
          }
        );
      });
      this.post("/api/todo", (schema, request) => {
        toDoList.push({
          id: id,
          title: request.requestBody.title,
          desc: request.requestBody.desc,
        });
        id++;
        return new Response(
          200,
          {},
          {
            code: 200,
            status: "OK",
          }
        );
      });
      this.put("/api/todo/:id", (schema, request) => {
        const id = request.params.id; //request params itu string
        const findId = toDoList.findIndex((item) => item.id == id);

        if (findId !== -1) {
          toDoList[index] = {
            id,
            title,
            desc
          };
          return new Response(
            200,
            {},
            {
              code: 200,
              status: "OK",
            }
          );
        } else {
          return new Response(
            404,
            {},
            {
              code: 404,
              status: "Not Found",
            }
          );
        }
      });      
      this.delete("/api/todo/:id", (schema, request) => {
        const deleteId = request.params.id; //request params itu string
        const findDeletedId = toDoList.findIndex((item) => item.id == deleteId);
        toDoList.splice(findDeletedId, 1);
        toDoList.push({
          id: id,
          title: request.requestBody.title,
          desc: request.requestBody.desc,
        });
        return new Response(
          200,
          {},
          {
            code: 200,
            status: "OK",
          }
        );
      });
    },
  });
}
