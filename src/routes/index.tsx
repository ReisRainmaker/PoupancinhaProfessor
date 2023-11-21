import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import NotFound from "../pages/notFound";
import CriarConta from "../pages/criarConta";
import AdcSub from "../pages/adc-sub";
import CriarTurma from "../pages/criarTurma";
import Home from "../pages/home";
import InserirProduto from "../pages/inserirProduto";
import ListarProduto from "../pages/listarProdutos";
import Presencas from "../pages/presencas";
import ResumoTurma from "../pages/resumoTurma";

const router = createBrowserRouter([
    {path: '/', element: <Login/>, errorElement: <NotFound/>},
    {path: '/criarConta', element: <CriarConta/>},
    
    {path: '/criarTurma/:idUser', element: <CriarTurma/>},
    {path: '/inserirProduto/:idUser', element: <InserirProduto/>},
    {path: '/listarProduto/:idUser', element: <ListarProduto/>},

    {path: '/home/:idUser', element: <Home/>},
    {path: '/adcinarOuSubtrair/:idUser', element: <AdcSub/>},
    {path: '/presencas/:idUser', element: <Presencas/>},
    {path: '/resumoTurma/:idUser', element: <ResumoTurma/>},


])

export default router