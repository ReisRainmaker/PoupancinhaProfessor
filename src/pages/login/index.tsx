import { Button, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom"
import './login.css';

export default function Login() {
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
                    <Input type="email" placeholder="E-mail" />
                    <Input type="password" placeholder="Senha" />
                    <p>Problemas no login? <a href="#">Clique aqui!</a></p>
                    <Button className="botao-logar">Logar</Button>
                </div>
            </div>
        </div>
    );
}
