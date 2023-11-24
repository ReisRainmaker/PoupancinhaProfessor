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
import AlterarProduto from "../pages/alterarProduto";

const router = createBrowserRouter([
    {path: '/', element: <Login/>, errorElement: <NotFound/>},
    {path: '/criarConta', element: <CriarConta/>},
    
    {path: '/criarTurma', element: <CriarTurma/>},
    {path: '/inserirProduto', element: <InserirProduto/>},
    {path: '/listarProduto', element: <ListarProduto/>},
    {path: '/alterarProduto/:idProduto', element: <AlterarProduto/>},

    {path: '/home', element: <Home/>},
    {path: '/adcinarOuSubtrair', element: <AdcSub/>},
    {path: '/presencas', element: <Presencas/>},
    {path: '/resumoTurma', element: <ResumoTurma/>},


])

export default router