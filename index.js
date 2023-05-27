const express = require("express");
const axios = require('axios');

const app = express();

const apiUrl = "https://api.openai.com/v1/chat/completions";
const PORT = 3000; 

const getResponsePrompt = async (prompt, apiKey)=>{
    try{
        const response = await axios.post(apiUrl, {
            messages: [{role: 'Sistema', content: 'Tu eres un asistente virtual con el apodo de Hihand'},{role: 'Usuario', content: prompt}]
        },
        {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": 'application.json', 
            },
        });
        return response.data.choices[0].message.content;
    }catch(err){
        return "Error al realizar la consulta";
    }
}

app.get("/chatOpenHihand", async(req, res) => {
    const prompt = req.query.prompt;
    const apiKey = req.query.apiKey;

    try{
        const resp = await getResponsePrompt(prompt, apiKey);
        res.json({response: resp})
    }catch (err){
        res.json({response: "Error al realizar la consulta"});
    }
});

app.listen(PORT, (err)=>{
    console.log(err);
})

