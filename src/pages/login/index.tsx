import { Button, Input, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"
import './login.css';
import {  useEffect, useState } from "react";
import axiosConfig from "../../config/axios";



export default function Login() {
    const navigate = useNavigate();
    const [resultado, setResultado] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const logar = () => {
        if (email == '' || password == '') {
            setResultado('Digite login e senha');
        } else {

            //Login na api
            axiosConfig.post('/auth/login', {
                email: email,
                password: password,
            }).then((resposta) => {
                if (resposta.data.error) {
                    setResultado(resposta.data.error)
                    return
                }
                const user = {
                    nome: resposta.data.nome,
                    sobrenome: resposta.data.sobrenome,
                    email: email,
                    idUser: resposta.data.idUser,
                    token: resposta.data.token,
                    expiresAt: resposta.data.expiresAt,
                    refreshToken: resposta.data.refreshToken
                }
                localStorage.setItem('auth-user', JSON.stringify(user));
                navigate(`/home`);
            }).catch((erro) => {
                console.log(erro)
                setResultado('falha ao realizar o login')
            })
        }
    };



    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("auth-user"));
    //     console.log(user)
    //     if (user.token != null && user.token != 'undefined'){
    //         console.log("User local storage: ", user.idUser)
    //         console.log("Email local storage: ", user.email)
    //         navigate(`/home/${user.idUser}`);
    //     }   
    // }, []);




    return (
        <div className="divisoriaLogin">
            <div className="divIrCriarConta">
                <div className="title-container">
                    <h1 className="titulo-grande">Poupancinha</h1>
                    <h2 className="titulo-pequeno">Ensinando a economizar</h2>
                </div>
                <div className="button-container">
                    <h3 className="titulo-pequeno">Ainda não tem uma conta?</h3>
                    <Link to='/criarConta' className="botao-cadastrar">Cadastre-se aqui</Link>
                </div>
            </div>
            <div className="divLogin">
                <div className="caixaLogin">
                    <img src="/src/images/logo-poupancinha.jpg" alt="Logo poupancinha" />
                    <h1>Faça seu login</h1>
                    <Input type="email" placeholder="E-mail" onChange={(evento) => setEmail(evento.target.value)} />
                    <Input type="password" placeholder="Senha" onChange={(evento) => setPassword(evento.target.value)} />
                    <p>Problemas no login? <a href="#">Clique aqui!</a></p>
                    <Button className="botao-logar" onClick={logar}>Logar</Button>
                    <Text>{resultado}</Text>
                </div>
            </div>
        </div>
    );
}
