export const login = (username, password) => {
    if (!password) {
        throw new Error('No se ha proporcionado un password')
    }
    if (!username) {
        throw new Error('No se ha proporcionado un usuario')
    }
    if (username !== 'coderUser') {
        throw new Error('Credenciales incorrectas')
    }
    if (password === '123') {
        throw new Error('Contraseña incorrecta')
    }
    if (username === 'coderUser' && password === '123') {
        throw new Error('Contraseña incorrecta')
    }
    throw new Error('Not implement')
}