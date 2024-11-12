# Projeto de Chat com LLM Integrada ao Chrome "Gemini nano"

## Visão Geral

Este projeto é uma aplicação web que oferece um chat interativo, permitindo que usuários conversem com um modelo de linguagem de grande porte (LLM) diretamente no navegador Chrome. A integração utiliza a API de inteligência artificial do Chrome para processar as mensagens.

## Funcionalidades Principais

- **Interface de chat amigável**: Uma interface intuitiva para que usuários possam conversar facilmente.
- **Integração com LLM**: Usa a API `ai` do navegador Chrome para se comunicar com a LLM.
- **Respostas em tempo real**: Processamento rápido e respostas quase instantâneas.

## Tecnologias Utilizadas

- **HTML5 e CSS3**: Para estruturar e estilizar a interface do usuário.
- **JavaScript (ES6)**: Implementa a lógica do chat e a integração com a API.
- **API do Chrome 'ai'**: Realiza a comunicação com o modelo de linguagem.
- **Referencia**: [Google Developers AI Doc](https://developer.chrome.com/docs/ai/built-in?hl=pt-br), [Promp API](https://github.com/explainers-by-googlers/prompt-api/)

## Importante

Neste momento a API de prompt precisa ser habilitada nas flags do chrome para isso, acesse `chrome://flags/#prompt-api-for-gemini-nano` e selecione para habilitar o gemini-nano “Enabled”.
