import { Text, Box, Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import SidebarWithHeader from "../../components/sidebar";
import { useEffect, useState } from 'react';
import './criarTurma.css'
import { useParams } from 'react-router-dom';
import axiosConfig from '../../config/axios';




export default function CriarTurma() {

    const { idUser } = useParams();


    const [imagem, setImagem] = useState(null);
    const [nomeTurma, setNomeTurma] = useState('');
    const [nomeEscola, setNomeEscola] = useState('');
    const [serieTurma, setSerieTurma] = useState('');

    const [userData, setUserData] = useState(null);
    const [ProfessorData, setProfessorData] = useState(null);
    const [turmasData, setTurmasData] = useState(null);
    const [nomeProfessor, setNomeProfessor] = useState("");

    useEffect(() => {
        const getUserById = async () => {
            if (idUser) {
                await axiosConfig.get(`home/userId/${idUser}`)
                    .then((response) => {
                        const data = response.data;
                        setUserData(data);
                        setNomeProfessor(data.nome)
                        console.log("Retorno do usuário", response.data)
                    }).catch((error) => {
                        console.error('Erro ao buscar informações do Usuário:', error);
                    })
            }
        }
        if (!userData) {
            getUserById();

        }
    }, [idUser, userData, nomeProfessor]);




    const salvarTurma = async () => {
        // APAGAR COMENTÁRIOS E ALTERAR NOMES


        try {
            // Construir o corpo da requisição
            const corpoRequisicao = {
                imagem,
                nomeTurma,
                nomeEscola,
                serieTurma,
            };


            // Fazer a requisição para o endpoint
            const resposta = await fetch('sua-url-do-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(corpoRequisicao),
            });




            // Verificar se a requisição foi bem-sucedida
            if (resposta.ok) {
                console.log('Turma salva com sucesso!');
                // Lógica adicional, se necessário
            } else {
                console.error('Erro ao salvar turma:', resposta.status);
                // Lógica adicional para lidar com erro
            }
        } catch (erro) {
            console.error('Erro na requisição:', erro);
            // Lógica adicional para lidar com erro
        }
    };


    const salvarImagemTurma = () => {
        //Criar função para salvar imagem
    };


    return (
        <SidebarWithHeader id={idUser} nome={nomeProfessor}>
            <Box className="box-fundo" h="91.9vh">
                <Box className='box-container-turma'>
                    <Text fontSize='5xl' color='Black' className='box-label-turma'>Cadastrar nova turma</Text>
                    <Box className="content-container-turma">
                        <Box className="imagem-container">
                            <img
                                src={imagem ? URL.createObjectURL(imagem) : '../../images/cedulas.jpg'}
                                alt="Imagem da Turma"
                                className="imagem-turma"
                            />
                            <Input type="file" accept="image/*" onChange={salvarImagemTurma} className="upload-btn" />
                        </Box>
                        <Stack className="form-container">
                            <FormControl>
                                <FormLabel>Nome da Turma:</FormLabel>
                                <Input
                                    type="text"
                                    value={nomeTurma}
                                    onChange={(e) => setNomeTurma(e.target.value)}
                                    className="input-field-criar-turma"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Nome da Escola:</FormLabel>
                                <Input
                                    type="text"
                                    value={nomeEscola}
                                    onChange={(e) => setNomeEscola(e.target.value)}
                                    className="input-field-criar-turma"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Série da Turma:</FormLabel>
                                <Input
                                    type="text"
                                    value={serieTurma}
                                    onChange={(e) => setSerieTurma(e.target.value)}
                                    className="input-field-criar-turma"
                                />
                            </FormControl>
                            <Button colorScheme='teal' className='button-turma' onClick={salvarTurma}>Salvar</Button>
                            {/* <button onClick={salvarTurma} className="save-btn">
                               Salvar
                           </button> */}
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </SidebarWithHeader>
    )
}



