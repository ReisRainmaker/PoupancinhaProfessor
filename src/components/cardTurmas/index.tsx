import { Card, Text, Image, Stack, Button, Box } from '@chakra-ui/react'
import './cardTurmas.css'

interface cardProps {
    turma: object
    
  }
  

export default function CardTurmas( props: cardProps) {
   const {turma} = props
   return (
       <Card className='card'>
           <Box className='card-content'>
               <Image
                   src='/src/images/logo-poupancinha.jpg'
                   boxSize='110px'
                   alt='Foto turma'
                   borderRadius='full'
               />


               <Stack className='card-title'>
                   <Text fontSize={'3xl'} fontWeight={800}>
                       {turma.nomeTurma}
                   </Text>
               </Stack>


               <Button
                   mt={10}
                   w={'full'}
                   bg={'teal.400'}
                   color={'white'}
                   rounded={'xl'}
                   boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                   _hover={{
                       bg: 'teal.500',
                   }}
                   _focus={{
                       bg: 'teal.500',
                   }}>
                   Resumo da turma
               </Button>
               <Button
                   mt={10}
                   w={'full'}
                   bg={'teal.400'}
                   color={'white'}
                   rounded={'xl'}
                   boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                   _hover={{
                       bg: 'teal.500',
                   }}
                   _focus={{
                       bg: 'teal.500',
                   }}>
                   Adicionar ou subtrair Valores
               </Button>
               <Button
                   mt={10}
                   w={'full'}
                   bg={'teal.400'}
                   color={'white'}
                   rounded={'xl'}
                   boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                   _hover={{
                       bg: 'teal.500',
                   }}
                   _focus={{
                       bg: 'teal.500',
                   }}>
                   Aplicar valores em chamadas
               </Button>
           </Box>
       </Card>
   )
}
