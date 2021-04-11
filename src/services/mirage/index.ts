import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker'

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer({ environment = "test"} = {}) {
  const server = createServer({
    environment,

    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return faker.name.findName()
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      })
    },

    seeds(server) {
      server.createList('user', 100)
    },

    routes() {
      this.namespace= 'api';
      this.timing = 750; // define um atraso para simular o de um api

      this.get('/users', function (schema, request) {
        const { page= 1, per_page = 10 } = request.queryParams

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user')).users.slice(pageStart, pageEnd)

        return new Response(
          200,
          {'x-total-count': String(total) },
          { users }
        )
      });

      this.get('/users/:id');
      this.post('/users');

      this.namespace= '' //volta o namespace pra vazio, para não prejudicar a rota api do next
      this.passthrough();
    }
  })


  return server;
}