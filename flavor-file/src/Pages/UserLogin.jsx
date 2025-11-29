import { useState } from 'react';
import { Plus } from 'lucide-react'
import '../styles/AddRecipeForm.css';

const API_BASE_URL = 'http://localhost:8080/api/v1';

function UserLogin(){
    const [blankName, setUserName] = useState('');
    const [blankPassword, setPassword] = useState('');


    const loginData ={
        userName: blankName,
        passWord: blankPassword
    };

    try{
        const response = await fetch('${API_BASE_URL}/users',{
            method: 'GET',
            headers:{

            }
        },
        body: JSON
    })
}