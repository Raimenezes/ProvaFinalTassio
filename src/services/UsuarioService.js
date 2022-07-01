import axios from "axios"

class UsuarioService{

    async converterReal(){
        return axios({
            url: "https://economia.awesomeapi.com.br/json/last/BRL-USD",
            method: "GET",
            headers: {
                accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

}

const usuarioService = new UsuarioService()
export default usuarioService