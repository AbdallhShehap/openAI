import {Configuration , OpenAIApi} from 'openai'
import readline from "readline";


const configuration = new Configuration({
    organization: "org-UYx2YYyHE4CAP1VBHXivSoq0"
,
apiKey:"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"
});


const openai = new OpenAIApi(configuration);


const userInerface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

userInerface.prompt();


userInerface.on("line",async(input)=>{
    await openai
    .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
    })
    .then((res) => {
        console.log(res.data.choices[0].message.content);
        userInerface.prompt();
    })
    .catch((e) => {
      console.log(e);
    });
})




