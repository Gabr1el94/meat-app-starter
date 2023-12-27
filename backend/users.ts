export class User {
    constructor( public email: string, 
        public name: string,
        public password: string){}

    matches(another:User): boolean {
        return another !== undefined && 
        another.email === this.email && 
        another.password === this.password
    }
}

export const users : {[key: string]: User} = {
    "teste@gmail.com": new User("teste@gmail.com", 'Teste', 'teste123'),
    "gss@gmail.com": new User("gss@gmail.com", 'Gss','gss21')
}