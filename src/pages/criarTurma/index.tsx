import { Text, Box, Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import SidebarWithHeader from "../../components/sidebar";
import { useEffect, useState } from 'react';
import './criarTurma.css'
import axiosConfig from '../../config/axios';
import { useNavigate } from 'react-router-dom';




export default function CriarTurma() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("auth-user"));
    const [professorData, setProfessorData] = useState(null);
    const [resultado, setResultado] = useState('Preencha os campos e pressione salvar para criar uma nova turma.');

    const [nomeTurma, setNomeTurma] = useState('');
    const [nomeEscola, setNomeEscola] = useState('');
    const [serieTurma, setSerieTurma] = useState('');
    const [imagemTurma, setImagemTurma] = useState('/src/images/logo-poupancinha.jpg');


    /////////////// Pegar as informações do professor por id do usuário ////////////
    useEffect(() => {
        const getUserById = async () => {
            if (user) {
                await axiosConfig.get(`professor/byUser/${user.idUser}`)
                    .then((response) => {
                        const data = response.data;
                        setProfessorData(data);
                        console.log("Retorno do Professor", response.data)
                    }).catch((error) => {
                        console.error('Erro ao buscar informações do Professor:', error);
                    })
            }
        }
        if (!professorData) {
            getUserById();

        }
    }, [user]);

    ///////////////// Salvar uma nova turma para o professor //////////////
    const salvarTurma = async () => {
        try {
            if (nomeTurma === '' || nomeEscola === '' || serieTurma === '' || imagemTurma === '') {
                setResultado('Preencha todos os campos corretamente');
                return;
            }
            const response = await axiosConfig.post(`turma`, {
                imagemTurma: imagemTurma,
                nomeTurma: nomeTurma,
                nomeEscola: nomeEscola,
                serie: serieTurma,
                idProfessor: professorData.idProfessor
            });
            const idTurma = response.data.idTurma
            if (idTurma) {
                // Lidar com o resultado do registro, se necessário
                console.log('Turma criada com sucesso:', response);
                setResultado('Turma criada com sucesso!');
                navigate(`/home`);
            } else {
                console.log('Erro ao salvar a turma')
            }

        } catch (erro) {
            console.error('Erro ao salvar turma:', erro);
            setResultado('Houve um problema ao tentar salvar a turma, Verifique as informações e tente novamente');
        }
    };



    const salvarImagemTurma = () => {
        //Criar função para salvar imagem
    };


    return (
        <SidebarWithHeader>
            <Box className="box-fundo" h="91.9vh">
                <Box className='box-container-turma'>
                    <Text fontSize='5xl' color='Black' className='box-label-turma'>Cadastrar nova turma</Text>
                    <Box className="content-container-turma">
                        <Box className="imagem-container">
                            <img
                                src={imagemTurma}
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
                            <h2 className='resultado'>{resultado}</h2>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </SidebarWithHeader>
    )
}



