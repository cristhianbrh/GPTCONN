const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();

const PORT = process.env.PORT || 3000; 


const getResponsePrompt = async (prompt, apiKey)=>{
    const configuration = new Configuration({
        apiKey: apiKey,
    })

    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Human: ${prompt} AIHAND: `,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [" Human:", " AIHAND:"],
    })
    return response.data.choices[0].text;
}

app.get("/chatOpenHihand", async(req, res) => {
    const prompt = req.query.prompt;
    const apiKey = req.query.apiKey;

    try{
        const resp = await getResponsePrompt(prompt, apiKey);
        console.log(resp);
        res.json(resp);
    }catch (err){
        res.json({response: "Error al realizar la consulta"});
    }
});

app.listen(PORT, (err)=>{
    console.log(err);
})

