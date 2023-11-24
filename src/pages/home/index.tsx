import CardTurmas from "../../components/cardTurmas";
import SidebarWithHeader from "../../components/sidebar";
import './home.css'
import { useEffect, useState } from "react";
import axiosConfig from "../../config/axios";
import { Box } from "@chakra-ui/react";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("auth-user"));
  const [professorData, setProfessorData] = useState(null);
  const [turmasData, setTurmasData] = useState([]);

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
  ////////////////// Pega informações da turma pelo id do professor ///////////
  
  useEffect(() => {
    const getTurmaByProfessor = async () => {
      if (professorData) {
        try {
          const response = await axiosConfig.get(`turma/idProfessor/${professorData.idProfessor}`);
          const data = response.data;
          setTurmasData(data);
          console.log("Retorno da Turma", data);
        } catch (error) {
          console.error('Erro ao buscar informações da turma:', error);
        } 
      }
    };

    if (turmasData.length === 0) {
      getTurmaByProfessor();
    }
  }, [professorData, turmasData]);

  return (
    <>
      <SidebarWithHeader>
        <Box className='box-home'>
          <Box className='box-container-home'>
            {
            turmasData.length <= 0 && (
                            <Box>
                                <h1> Ainda não há nenhuma turma cadastrada. </h1>
                                <h1> Acesse o menu cadastrar turmas na barra lateral. </h1>
                            </Box>
                        )
            }
            {turmasData.map((turmaItem) => (
            <Box className='card-home' key={turmaItem.idTurma}>
              <CardTurmas turma={turmaItem}></CardTurmas>
            </Box>
            ))}
          </Box>
        </Box>
      </SidebarWithHeader>

    </>
  )
}