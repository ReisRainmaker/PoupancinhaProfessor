import { Text, Box, Stack, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react'
import SidebarWithHeader from "../../components/sidebar";
import { useState } from 'react';
import './inserirProduto.css'


export default function InserirProduto() {
   const [imagem, setImagem] = useState(null);
   const [nome, setNome] = useState('');
   const [valor, setValor] = useState('');
   const [quantidade, setQuantidade] = useState('');
   const [descricao, setDescricao] = useState('');




   const salvarProduto = async () => {
       // APAGAR COMENTÁRIOS E ALTERAR NOMES
       try {
           // Construir o corpo da requisição
           const corpoRequisicao = {
               imagem,
               nome,
               valor,
               quantidade,
               descricao,
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
               console.log('Produto salvo com sucesso!');
               // Lógica adicional, se necessário
           } else {
               console.error('Erro ao salvar produto:', resposta.status);
               // Lógica adicional para lidar com erro
           }
       } catch (erro) {
           console.error('Erro na requisição:', erro);
           // Lógica adicional para lidar com erro
       }
   };


   const salvarImagem = () => {
       //Criar função para salvar imagem
   };


   return (
       <SidebarWithHeader >
           <Box className="boxFundo"  h="91.9vh">
               <Box className='boxContainerProduto'>
                   <Text fontSize='5xl' color='Black' className='box-label'>Cadastrar novo produto</Text>
                   <Box className="contentContainerProduto">
                       <Box className="imagem-container">
                           <img
                               src={imagem ? URL.createObjectURL(imagem) : '../../images/cedulas.jpg'}
                               alt="Imagem do Produto"
                               className="imagem-produto"
                           />
                           <Input type="file" accept="image/*" onChange={salvarImagem} className="upload-btn" />
                       </Box>
                       <Stack className="form-container">
                           <FormControl>
                               <FormLabel>Nome do Produto:</FormLabel>
                               <Input
                                   type="text"
                                   value={nome}
                                   onChange={(e) => setNome(e.target.value)}
                                   className="criarProduto"
                               />
                           </FormControl>
                           <FormControl>
                               <FormLabel>Preço:</FormLabel>
                               <Input
                                   type="text"
                                   value={valor}
                                   onChange={(e) => setValor(e.target.value)}
                                   className="criarProduto"
                               />
                           </FormControl>
                           <FormControl>
                               <FormLabel>Quantidade disponível:</FormLabel>
                               <Input
                                   type="text"
                                   value={quantidade}
                                   onChange={(e) => setQuantidade(e.target.value)}
                                   className="criarProduto"
                               />
                           </FormControl>
                           <FormControl>
                               <FormLabel>Descrição:</FormLabel>
                               <Textarea
                                   value={descricao}
                                   onChange={(e) => setDescricao(e.target.value)}
                                   className="criarProduto"
                               />
                           </FormControl>
                               <Button colorScheme='teal' className='button-produto' onClick={salvarProduto}>Salvar</Button>
                           {/* <button onClick={salvarProduto} className="save-btn">
                               Salvar
                           </button>  */}
                       </Stack>
                   </Box>
               </Box>
           </Box>
       </SidebarWithHeader>
   )
}
