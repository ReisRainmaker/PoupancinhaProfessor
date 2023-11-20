import CardTurmas from "../../components/cardTurmas";
import SidebarWithHeader from "../../components/sidebar";
import './home.css'

export default function Home(){
    
    return(
        <>
        <SidebarWithHeader>
            <div className="boxConteudo">
            <CardTurmas></CardTurmas>
            <div>emailUser</div>

            </div>
        </SidebarWithHeader>
        
        </>
    )
}