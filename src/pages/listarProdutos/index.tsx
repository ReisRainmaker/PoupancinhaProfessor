
import './listarProdutos.css';
import SidebarWithHeader from "../../components/sidebar";
import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import axiosConfig from '../../config/axios';
import { useNavigate } from 'react-router-dom';


export default function ListarProduto() {
    const user = JSON.parse(localStorage.getItem("auth-user"));
    const [professorData, setProfessorData] = useState(null);
    const [produtosData, setProdutosData] = useState([])
    const navigate = useNavigate();


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
    //////////// pegar os produtos pelo id do professor ///////////
    const getProdutoByProfessor = async () => {
        try {
            if (produtosData) {
                const response = await axiosConfig.get(`produto/byProfessor/${professorData.idProfessor}`);
                const data = response.data;
                setProdutosData(data);
                console.log("Retorno de produtos", response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar Produtos:', error);
        }
    };
    useEffect(() => {

        if (produtosData.length === 0) {
            getProdutoByProfessor();
        }
    }, [produtosData, professorData]);


    const excluirProduto = async (id: number) => {
        const confirmacao = window.confirm("Tem certeza que deseja excluir este item?");
        console.log("id: " , id)
        if (confirmacao) {
            try {
                await excluirItem(id);
            } catch (error) {
                console.error("Falha ao tentar excluir:", error.message);
            }
        }
    };
    const excluirItem = async (id: number) => {
        try {
            const response = await axiosConfig.delete(`produto/${id}`);
            console.log('Produto excluido com sucesso', response)
            getProdutoByProfessor();
        } catch (error) {
            console.log("Falha ao tentar excluir o item.", error);
        }
    };





    return (
        <SidebarWithHeader>
            <Box className="boxFundo" h="91.9vh">
                <Box className='boxContainerProdutos'>
                    <TableContainer className="table">
                        <Table variant="striped" size='lg'>
                            <Thead>
                                <Tr>
                                    <Th>Nome do produto</Th>
                                    <Th>Preço</Th>
                                    <Th>Quantidade disponível</Th>
                                    <Th>Quantidade vendida</Th>
                                    <Th></Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>


                            <Tbody>
                                {produtosData?.map((produto) => (
                                    <Tr key={produto.idProduto}>
                                        <Td>{produto.nome}</Td>
                                        <Td>{produto.preco}</Td>
                                        <Td>{produto.quantDisponivel} </Td>
                                        <Td>{produto.quantVendidos}</Td>
                                        <Td><Button colorScheme='teal' key={produto.id} onClick={() => navigate(`/alterarProduto/${produto.idProduto}`)}>Alterar</Button></Td>
                                        <Td><Button colorScheme='red' key={produto.id} onClick={() => excluirProduto(produto.idProduto)}>Excluir</Button></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </SidebarWithHeader>
    )
}
