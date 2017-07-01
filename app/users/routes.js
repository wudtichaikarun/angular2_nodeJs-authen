import controller from './controller'
//new router
export function setup(router){
    // instand of app.get('/users',() => {})
    router
        .get('/:id', controller.get) // --->   localhost:3000/users/:id
        .get('/', controller.getAll) // --->   localhost:3000/users
        .post('/', controller.create)// --->   localhost:3000/users
}
