import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import { useHistory } from 'react-router-dom';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css';
import api from '../../Services/api';

function TeacherForm(){
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');


    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string){
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
            
        });
        
        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/');
        }).catch(() =>{
            alert('Erro no cadastro');
        })        
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrivel que você quer dar aulas."
            description="O primeiro passo é preencher o formulário"/>
        
        
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            name="name" 
                            label="Nome Completo" 
                            value={name} 
                            onChange={(e) => {
                                setName(e.target.value)
                            }} 
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar" 
                            value={avatar} 
                            onChange={(e) => {
                                setAvatar(e.target.value)
                            }} 
                        />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp" 
                            value={whatsapp} 
                            onChange={(e) => {
                                setWhatsapp(e.target.value)
                            }} 
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio} 
                            onChange={(e) => {
                                setBio(e.target.value)
                            }} 
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre as Aulas</legend>
                        
                        <Select 
                            name="subject" 
                            label="Matéria" 
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value)
                            }} 
                            options={[
                                { value: 'Artes', label: 'Artes'},
                                { value: 'Educação Fisica', label: 'Educação Fisica'},
                                { value: 'Fisica', label: 'Fisica'},
                                { value: 'Geogradia', label: 'Geogradia'},
                                { value: 'Historia', label: 'Historia'},
                                { value: 'Matematica', label: 'Matematica'},
                                { value: 'Portugues', label: 'Portugues'},
                                { value: 'Quimica', label: 'Quimica'},
                                { value: 'Filosofia', label: 'Filosofia'},                                
                            ]}
                        />
                        <Input 
                        name="cost" 
                        label="Custo da sua hora por aula" 
                        value={cost}
                        onChange={(e) => {
                            setCost(e.target.value)
                        }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponiveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                    {scheduleItems.map((scheduleItem, index) => {
                        return (
                            <div key={scheduleItem.week_day} className="schedule-item">
                            <Select 
                                name="weed_day" 
                                label="Dia da semana" 
                                value={scheduleItem.week_day}
                                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                options={[
                                    { value: '0', label: 'Domingo'},
                                    { value: '1', label: 'Segunda'},
                                    { value: '2', label: 'Terça'},
                                    { value: '3', label: 'Quarta'},
                                    { value: '4', label: 'Quinta'},
                                    { value: '5', label: 'Sexta'},
                                    { value: '6', label: 'Sabado'},
                                ]}
                            />
                            <Input 
                                name="from" 
                                label="As" 
                                type="time"
                                value={scheduleItem.from}
                                onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                            />
                            <Input 
                                name="to" 
                                label="até" 
                                type="time"
                                value={scheduleItem.to}
                                onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                            />
                        </div>
                        )
                    })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Warning"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar Cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>

    )
}

export default TeacherForm;