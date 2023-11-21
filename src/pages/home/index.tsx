import { useParams } from "react-router-dom";
import CardTurmas from "../../components/cardTurmas";
import SidebarWithHeader from "../../components/sidebar";
import './home.css'
import { useEffect, useState } from "react";
import axiosConfig from "../../config/axios";
import { Box } from "@chakra-ui/react";

export default function Home() {
  const { idUser } = useParams();
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

  return (
    <>
      <SidebarWithHeader id={idUser} nome={nomeProfessor}>
        <Box className='box-home'>
          <Box className='box-container-home'>
            <Box className='card-home'>
              <CardTurmas></CardTurmas>
            </Box>
            <Box className='card-home'>
              <CardTurmas></CardTurmas>
            </Box>
            <Box className='card-home'>
              <CardTurmas></CardTurmas>
            </Box>
            <Box className='card-home'>
              <CardTurmas></CardTurmas>
            </Box>
            <Box className='card-home'>
              <CardTurmas></CardTurmas>
            </Box>
            <Box className='card-home'>
              <CardTurmas></CardTurmas>
            </Box>
          </Box>
        </Box>
      </SidebarWithHeader>

    </>
  )
}