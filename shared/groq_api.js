const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Configurações da API
const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct';

// Caminho da pasta
const folderPath = 'C:\\Users\\felip\\Downloads\\DIMAZZO';

// Tipos de arquivos permitidos
const allowedExtensions = ['.jpg', '.jpeg', '.png'];

// Função para ler e codificar a imagem
function getImageAsBase64(filePath) {
  const fileData = fs.readFileSync(filePath);
  const ext = path.extname(filePath).replace('.', '');
  const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  return `data:${mimeType};base64,${fileData.toString('base64')}`;
}

// Localiza o primeiro arquivo de imagem válido
function getFirstImageFile(folderPath) {
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      return path.join(folderPath, file);
    }
  }
  return null;
}

// Chamada para a API Groq com imagem embutida
async function callGroqWithImage(base64Image) {
  const messages = [
    {
      role: "system",
      content: "Você é um assistente especialista em extração de dados de notas fiscais brasileiras. Analise a imagem da nota fiscal fornecida e extraia TODOS os itens/produtos listados. Para cada produto, extraia as seguintes informações: descricao, quantidade, unidade, valor_unitario e valor_total. Retorne os dados ESTRITAMENTE no seguinte formato JSON, dentro de um objeto principal chamado 'produtos': {\"produtos\": [{\"descricao\": \"string\",\"quantidade\": float,\"unidade\": \"string\",\"valor_unitario\": float,\"valor_total\": float}]}. Não inclua nenhuma explicação, introdução ou texto adicional na sua resposta. Se não encontrar nenhum produto, retorne uma lista vazia: {\"produtos\": []}."
    },
    {
      role: "user",
      content: [
        {
          type: "image_url",
          image_url: {
            url: base64Image
          }
        }
      ]
    }
  ];

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: MODEL,
        messages: messages,
        temperature: 0.2,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const result = response.data.choices[0].message.content;
    console.log(result);
  } catch (error) {
    console.error("Erro na chamada à API Groq:", error.response?.data || error.message);
  }
}

// Executa o processo
const imagePath = getFirstImageFile(folderPath);
if (imagePath) {
  const base64Image = getImageAsBase64(imagePath);
  callGroqWithImage(base64Image);
} else {
  console.log("Nenhuma imagem válida encontrada na pasta.");
}