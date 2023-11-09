import { Button, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom"
import './criarConta.css';

export default function CriarConta() {
    return (
        <div className="divisoriaCriarConta">
            <div className="divCriarConta">
                <div className="caixaCriarConta">
                    <h1>Crie sua conta:</h1>
                    <Input type="text" placeholder="Nome" />
                    <Input type="text" placeholder="Sobrenome" />
                    <Input type="email" placeholder="E-mail" />
                    <Input type="date" placeholder="Data de nascimento" />
                    <Input type="password" placeholder="Senha" />
                    <Input type="password" placeholder="Repita a senha" />
                    
                    <Button className="botao-logar">Criar conta</Button>
                </div>
            </div>
            <div className="divIrLogin">
                <div className="title-container">
                    <h1 className="titulo-grande">Poupancinha</h1>
                    <h2 className="titulo-pequeno">Educação financeira brincando!</h2>
                </div>
                <div className="criarConta-button-container">
                    <h3 className="titulo-pequeno">Já tem uma conta?</h3>
                    <Link to='/' className="botao-cadastrar">Faça login aqui</Link>
                </div>
            </div>
            
        </div>
    );
}
