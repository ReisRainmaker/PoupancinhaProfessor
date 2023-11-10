import SidebarWithHeader from "../../components/sidebar";
import { useState } from 'react';

export default function CriarTurma() {

    const [imagem, setImagem] = useState(null);
    const [nomeTurma, setNomeTurma] = useState('');
    const [nomeEscola, setNomeEscola] = useState('');
    const [serieTurma, setSerieTurma] = useState('');

    const salvarImagem = () => {
        //Criar função para salvar imagem
    };

    const salvarTurma = () => {
        //Criar lógica para salvar os dados da turma
        console.log('Dados salvos:', {
            imagem,
            nomeTurma,
            nomeEscola,
            serieTurma,
        });
    };

    return (
        <SidebarWithHeader>
            <div className="container">
                <h1>Criar Nova Turma</h1>

                <div className="content-container">
                    <div className="imagem-container">
                        <img
                            src={imagem ? URL.createObjectURL(imagem) : '../../images/cedulas.jpg'}
                            alt="Imagem da Turma"
                            className="imagem-turma"
                        />
                        <input type="file" accept="image/*" onChange={salvarImagem} className="upload-btn" />
                    </div>

                    <div className="form-container">
                        <div>
                            <label>Nome da Turma:</label>
                            <input
                                type="text"
                                value={nomeTurma}
                                onChange={(e) => setNomeTurma(e.target.value)}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label>Nome da Escola:</label>
                            <input
                                type="text"
                                value={nomeEscola}
                                onChange={(e) => setNomeEscola(e.target.value)}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label>Série da Turma:</label>
                            <input
                                type="text"
                                value={serieTurma}
                                onChange={(e) => setSerieTurma(e.target.value)}
                                className="input-field"
                            />
                        </div>
                        <button onClick={salvarTurma} className="save-btn">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </SidebarWithHeader>
    )
}