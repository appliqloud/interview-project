# Prueba de frontend
### Pasos a seguir
#### Setup
- Forkear este repositorio (solo la rama `main`)
- Clonar el fork en el entorno local
- Crear una nueva rama con el formato `nombre`-`prueba`(ej. `david-frontend`, `lucas-frontend`, etc.)

#### Desarrollo del proyecto
  - El proyecto consiste en un aplicativo web para gestionar productos y órdenes.
  - El layout y la estética general del aplicativo quedan a discreción del candidato.
  - El proyecto debe tener la opción de cambiar el idioma entre español e inglés.
  - Para las consultas del proyecto se puede utilizar REST o GraphQL (GraphQL es lo que se utiliza en los desarrollos de AppliQloud)
    - Las consultas se harán a la url https://interview.appliqloud.com
    - La documentación de la API REST se puede ver en la URL https://interview.appliqloud.com/docs
    - El schema de GraphQL se puede ver en la URL https://interview.appliqloud.com/graphql a través de la introspección de GraphQL en Postman o algún programa similar, o en el [siguiente archivo](./schema.graphql)

#### Login
  - Hay dos tipos de roles de usuarios, `ADMIN` y `USER`.
  - El login se hace a través de OAuth2, mandando una petición `POST` al endpoint `/users/token`, enviando el usuario y contraseña en el cuerpo y recibiendo como respuesta un token de acceso.
  - Este token de acceso vence a los 15 minutos y se envia en el header `Authorization` bajo el esquema `Bearer Token` en todas las demás peticiones.
  - En caso de que el token haya vencido, hay que redireccionar al usuario al login
  - Las credenciales de acceso serán entregados a través de correo electrónico

#### Aplicación de productos
  - La aplicación de productos debe permitir las operaciones de creación, modificación, lectura, borrado, activación y desactivación de productos.
  - Los usuarios `ADMIN` deberian tener acceso a todas las acciones de la aplicación de órdenes.
  - Los usuarios `USER` deberan tambien ver esta aplicación, pero con una vista de solo lectura, bloqueando las demas acciones

#### Aplicación de órdenes
  - La aplicación de órdenes permite crear órdenes en base a productos existentes.
  - Los usuarios `ADMIN` deben de poder ver todas las órdenes existentes, además de poder marcar una órden como recibida o cancelarla.
  - Los usuarios `USER` deben de poder ver solo las órdenes que ellos crearon, crear nuevas órdenes o cancelar una órden.

#### Entrega
- Publicar la rama local en el fork de GitHub
- Enviar un pull request del fork a la rama `main` del repositorio padre

---

### Referencia de API
#### App de usuarios (REST)

| Método   | Path                                | Uso                                      | ¿Usable por ADMIN? | ¿Usable por USER? |
|----------|-------------------------------------|------------------------------------------|--------------------|-------------------|
| `POST`   | `/users/token`                      | Obtiene un token de acceso           | X                  | X                 |
| `GET`    | `/users/me`                         | Obtiene los datos del usuario que realiza la petición | X                  | X                 |

#### App de usuarios (GraphQL)

| Tipo       | Operación           | Uso                                      | ¿Usable por ADMIN? | ¿Usable por USER? |
|------------|---------------------|------------------------------------------|--------------------|-------------------|
| `Query`    | `me`     | Obtiene los datos del usuario que realiza la petición           | X                  | X                 |

#### App de productos (REST)

| Método   | Path                                | Uso                                      | ¿Usable por ADMIN? | ¿Usable por USER? |
|----------|-------------------------------------|------------------------------------------|--------------------|-------------------|
| `GET`    | `/products/count`                   | Regresa el número de productos           | X                  | X                 |
| `GET`    | `/products`                         | Obtiene una lista de todos los productos | X                  | X                 |
| `GET`    | `/products/{:productId}`            | Obtiene un producto en específico        | X                  | X                 |
| `POST`   | `/products`                         | Crea un producto                         | X                  |                   |
| `PUT`    | `/products/{:productId}`            | Modifica un producto                     | X                  |                   |
| `PUT`    | `/products/deactivate/{:productId}` | Desactiva un producto                    | X                  |                   |
| `PUT`    | `/products/activate/{:productId}`   | Activa un producto                       | X                  |                   |
| `DELETE` | `/products/{:productId}`            | Elimina un producto                      | X                  |                   |

#### App de productos (GraphQL)

| Tipo       | Operación           | Uso                                      | ¿Usable por ADMIN? | ¿Usable por USER? |
|------------|---------------------|------------------------------------------|--------------------|-------------------|
| `Query`    | `countProducts`     | Regresa el número de productos           | X                  | X                 |
| `Query`    | `findProducts`      | Obtiene una lista de todos los productos | X                  | X                 |
| `Query`    | `findProductById`   | Obtiene un producto en específico        | X                  | X                 |
| `Mutation` | `createProduct`     | Crea un producto                         | X                  |                   |
| `Mutation` | `updateProduct`     | Modifica un producto                     | X                  |                   |
| `Mutation` | `deactivateProduct` | Desactiva un producto                    | X                  |                   |
| `Mutation` | `activateProduct`   | Activa un producto                       | X                  |                   |
| `Mutation` | `deleteProduct`     | Elimina un producto                      | X                  |                   |

#### App de órdenes (REST)

| Método   | Path                         | Uso                                      | ¿Usable por ADMIN? | ¿Usable por USER? |
|----------|------------------------------|------------------------------------------|--------------------|-------------------|
| `GET`    | `/orders/count`              | Regresa el número de órdenes             | X                  | X                 |
| `GET`    | `/orders`                    | Obtiene una lista de todas las órdenes   | X                  | X                 |
| `GET`    | `/orders/{:orderId}`         | Obtiene una orden en específico          | X                  | X                 |
| `POST`   | `/orders`                    | Crea una orden                           |                    | X                 |
| `PUT`    | `/orders/receive/{:orderId}` | Marca una orden como recibida            | X                  |                   |
| `PUT`    | `/orders/cancel/{:orderId}`  | Cancela una orden                        | X                  | X                 |

#### App de órdenes (GraphQL)

| Tipo       | Operación             | Uso                                      | ¿Usable por ADMIN? | ¿Usable por USER? |
|------------|-----------------------|------------------------------------------|--------------------|-------------------|
| `Query`    | `countOrders`         | Regresa el número de órdenes             | X                  | X                 |
| `Query`    | `findOrders`          | Obtiene una lista de todas las órdenes   | X                  | X                 |
| `Query`    | `findOrderById`       | Obtiene una orden en específico          | X                  | X                 |
| `Mutation` | `createOrder`         | Crea una orden                           |                    | X                 |
| `Mutation` | `markOrderAsReceived` | Marca una orden como recibida            | X                  |                   |
| `Mutation` | `cancelOrder`         | Cancela una orden                        | X                  | X                 |
