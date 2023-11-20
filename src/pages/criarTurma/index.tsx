import { Text, Box, Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import SidebarWithHeader from "../../components/sidebar";
import { useState } from 'react';
import './criarTurma.css'


export default function CriarTurma() {


    const [imagem, setImagem] = useState(null);
    const [nomeTurma, setNomeTurma] = useState('');
    const [nomeEscola, setNomeEscola] = useState('');
    const [serieTurma, setSerieTurma] = useState('');


    const salvarImagem = () => {
        //Criar função para salvar imagem
    };


    const salvarTurma = () => {
        //Criar lógica para salvar os dados da turma
        console.log('Dados salvos:', {
            imagem,
            nomeTurma,
            nomeEscola,
            serieTurma,
        });
    };


    return (
        <SidebarWithHeader>
            <Box className="boxFundo" h="91.9vh">
                <Box className='boxContainer'>
                    <Text fontSize='4vw' color='Black'>Cadastrar nova turma</Text>


                    <Box className="contentContainer">
                        <Box className="imagem-container">
                            <img
                                src={imagem ? URL.createObjectURL(imagem) : '../../images/cedulas.jpg'}
                                alt="Imagem da Turma"
                                className="imagem-turma"
                            />
                            <Input type="file" accept="image/*" onChange={salvarImagem} className="upload-btn" />
                        </Box>


                        <Stack className="form-container">
                            <FormControl>
                                <FormLabel>Nome da Turma:</FormLabel>
                                <Input
                                    type="text"
                                    value={nomeTurma}
                                    onChange={(e) => setNomeTurma(e.target.value)}
                                    className="input-field-criarTurma"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Nome da Escola:</FormLabel>
                                <Input
                                    type="text"
                                    value={nomeEscola}
                                    onChange={(e) => setNomeEscola(e.target.value)}
                                    className="input-field-criarTurma"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Série da Turma:</FormLabel>
                                <Input
                                    type="text"
                                    value={serieTurma}
                                    onChange={(e) => setSerieTurma(e.target.value)}
                                    className="input-field-criarTurma"
                                />
                            </FormControl>
                            <button onClick={salvarTurma} className="save-btn">
                                Salvar
                            </button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </SidebarWithHeader>
    )
}
