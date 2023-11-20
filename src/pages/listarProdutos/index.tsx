
import './listarProdutos.css';
import SidebarWithHeader from "../../components/sidebar";
import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';


export default function ListarProduto() {


   const [produtosData, setProdutosData] = useState([])


   useEffect(() => {
       fetch('https://www.balldontlie.io/api/v1/players?page=1')
           .then((response) => response.json())
           .then((data) => setProdutosData(data.data));
   }, [])


   const alterarProduto = (id: any) => {
       console.log('alterar produto', id);
   }


   const excluirProduto = (id: number) => {
       console.log('excluir produto', id);
   }


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
                                   <Tr key={produto.id}>
                                       <Td>{produto.first_name} {produto.last_name}</Td>
                                       <Td>{produto.team.full_name}</Td>
                                       <Td>{produto.first_name} {produto.last_name}</Td>
                                       <Td>{produto.team.full_name}</Td>
                                       <Td><Button colorScheme='teal' key={produto.id} onClick={() => alterarProduto(produto.id)}>Alterar</Button></Td>
                                       <Td><Button colorScheme='red' key={produto.id} onClick={() => excluirProduto(produto.id)}>Excluir</Button></Td>
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
