import { Button, Input, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import './criarConta.css';
import { useState } from "react";
import axiosConfig from "../../config/axios";


export default function CriarConta() {
    const [resultado, setResultado] = useState('Informe seus dados');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senha, setSenha] = useState('');
    const [repitaSenha, SetRepitaSenha] = useState('');
    const navigate = useNavigate();



    const criarContaProfessor = async () => {
        try {
            if (nome === '' || sobrenome === '' || email === '' || senha === '' || repitaSenha === '') {
                setResultado('Preencha todos os campos corretamente');
                return;
            } else if (senha !== repitaSenha) {
                setResultado('As senhas digitadas estão diferentes');
                return;
            } else if (senha.length < 6) {
                setResultado('A senha deve ter ao menos de 6 dígitos');
                return;
            }

            await axiosConfig.get(`homeAluno/user/${email}`);
            setResultado('Este E-mail já foi cadastrado.');
        } catch (error) {
            try {
                const response = await axiosConfig.post('auth/register', {
                    name: nome,
                    sobreNome: sobrenome,
                    email: email,
                    dataNascimento: dataNascimento,
                    senha: senha,
                    turma: 'sem Turma',
                    tipoUsuario: 'Professor',
                });
                const idUser = response.data.id
                if (idUser){
                // Lidar com o resultado do registro, se necessário
                console.log('Conta criada com sucesso:', response);

                setResultado('Conta criada com sucesso!');
                logar()
                }else{
                    console.log('erro ao registrar o id de usuário')
                }
            } catch (e) {
                console.error('Erro ao criar a conta:', e);
                setResultado('Erro ao criar a conta. Verifique seus dados e tente novamente.');
            }
        }
    };

    const logar = () => {
        if (email == '' || senha == '') {
            setResultado('Digite login e senha');
        } else {

            //Login na api
            axiosConfig.post('/auth/login', {
                email: email,
                password: senha,
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



    return (
        <div className="divisoriaCriarConta">
            <div className="divCriarConta">
                <div className="caixaCriarConta">
                    <h1>Crie sua conta:</h1>
                    <Input type="text" placeholder="Nome" onChange={(evento) => setNome(evento.target.value)} />
                    <Input type="text" placeholder="Sobrenome" onChange={(evento) => setSobrenome(evento.target.value)} />
                    <Input type="email" placeholder="E-mail" onChange={(evento) => setEmail(evento.target.value)} />
                    <Input type="date" placeholder="Data de nascimento" onChange={(evento) => setDataNascimento(evento.target.value)} />
                    <Input type="password" placeholder="Senha" onChange={(evento) => setSenha(evento.target.value)} />
                    <Input type="password" placeholder="Repita a senha" onChange={(evento) => SetRepitaSenha(evento.target.value)} />
                    <Text>{resultado}</Text>
                    <Button className="botao-logar" onClick={criarContaProfessor}>Criar conta</Button>
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
