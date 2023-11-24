import { Text, Box, Stack, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react'
import SidebarWithHeader from "../../components/sidebar";
import { useEffect, useState } from 'react';
import '../inserirProduto/inserirProduto.css'
import axiosConfig from '../../config/axios';
import { useParams } from 'react-router-dom';


export default function AlterarProduto() {

    const {idProduto} = useParams();
    const user = JSON.parse(localStorage.getItem("auth-user"));
    const [professorData, setProfessorData] = useState(null);
    const [produtoData, setProdutoData] = useState(null);
    const [resultado, setResultado] = useState('Preencha os campos e pressione o botão para salvar o produto.');

    const [imagem, setImagem] = useState('/src/images/cedulas.jpg');
    const [nome, setNome] = useState(null);
    const [valor, setValor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [descricao, setDescricao] = useState('');

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
    /////////////// Pegar as informações do produto pelo parametro da rota ////////////
    useEffect(() => {
        const getProduto = async () => {
            if (idProduto) {
                await axiosConfig.get(`produto/${idProduto}`)
                    .then((response) => {
                        const data = response.data;
                        setProdutoData(data);
                        setNome(data.nome)
                        setValor(data.preco)
                        setDescricao(data.descricao)
                        setQuantidade(data.quantDisponivel)

                        console.log("Retorno do produto", response.data)
                    }).catch((error) => {
                        console.error('Erro ao buscar informações do Produto:', error);
                    })
            }
        }
        if (!produtoData) {
            getProduto();

        }
    }, [idProduto]);

    ///////////////// Atualizar a turma //////////////
    const salvarProduto = async (idProduto: number) => {
        const id = idProduto
        try {
            if (nome === '' || valor === null || quantidade === null || descricao === ''|| imagem === '') {
                setResultado('Preencha todos os campos corretamente');
                return;
            }
            const response = await axiosConfig.put(`produto/${id}`, {
                
                nome: nome,
                preco: valor,
                imagem: imagem,
                idProfessor: professorData.idProfessor,
                quantDisponivel: quantidade,
                quantVendidos: 0,
                descricao: descricao
            });
            const idProduto = response.data.idProduto
            if (idProduto) {
                // Lidar com o resultado do registro, se necessário
                console.log('Produto atualizado com sucesso: ', response);
                setResultado('Produto atualizado com sucesso!');
            } else {
                console.log('Erro ao salvar o produto')
            }

        } catch (erro) {
            console.error('Erro ao salvar o produto:', erro);
            setResultado('Houve um problema ao tentar salvar o produto, Verifique as informações e tente novamente');
        }
    };




    const salvarImagemProduto = () => {
        //Criar função para salvar imagem
    };




    return (
        <SidebarWithHeader>
            <Box className="box-fundo" h="91.9vh">
                <Box className='box-container-produto'>
                    <Text fontSize='5xl' color='Black' className='box-label-produto'>Atualizar produto</Text>
                    <Box className="content-container-produto">
                        <Box className="imagem-container-produto">
                            <img
                                src={imagem}
                                alt="Imagem do Produto"
                                className="imagem-produto"
                            />
                            <Input type="file" accept="image/*" onChange={() => setImagem} className="upload-btn" />
                        </Box>
                        <Stack className="form-container">
                            <FormControl>
                                <FormLabel>Nome do Produto:</FormLabel>
                                <Input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className="input-field-input-field-input-field-input-field-criar-produto"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Preço:</FormLabel>
                                <Input
                                    type="text"
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                    className="input-field-input-field-input-field-input-field-criar-produto"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Quantidade disponível:</FormLabel>
                                <Input
                                    type="text"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                    className="input-field-input-field-input-field-input-field-criar-produto"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Descrição:</FormLabel>
                                <Textarea
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    className="input-field-input-field-input-field-input-field-criar-produto"
                                />
                            </FormControl>
                            <Button colorScheme='teal' className='button-produto' onClick={() => salvarProduto(Number(idProduto))}>Salvar</Button>
                            <h2 className='resultado'>{resultado}</h2>
                        </Stack>
                    </Box>
                </Box>
            </Box>

        </SidebarWithHeader>
    )
}

