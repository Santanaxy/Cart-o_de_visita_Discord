# Discord Card

### Seu perfil. Sua identidade. Seu espaço.

Um projeto de cartão de visita digital inspirado no universo do Discord, desenvolvido para transformar um simples link de convite em uma experiência visual personalizada, interativa e dinâmica.

A proposta é evoluir de um cartão individual para uma plataforma na qual diferentes usuários possam conectar suas contas do Discord e criar seus próprios cartões digitais.

---

## Sobre o projeto

O **Discord Card** nasceu da ideia de oferecer uma maneira mais criativa de apresentar um perfil, reunir redes sociais, compartilhar comunidades e destacar conteúdos pessoais em uma única página.

Atualmente, o projeto conta com uma interface personalizada desenvolvida com tecnologias web, combinando animações, elementos multimídia e uma identidade visual moderna.

Nossa visão de longo prazo é permitir que qualquer pessoa conecte sua conta do Discord, importe as informações disponibilizadas pela API mediante autorização e personalize seu próprio cartão.

## Funcionalidades atuais

- Interface com tema escuro e efeito glassmorphism.
- Cartão digital com informações de perfil.
- Efeitos visuais, partículas e interações 3D.
- Animação de texto e elementos multimídia.
- Links para redes sociais e comunidades.
- Acesso a servidor do Discord por convite.
- Integração visual com conteúdo do Spotify.
- Área dedicada à apresentação de jogos recentes.
- Estrutura de personalização por HTML, CSS e JavaScript.

> O projeto está em desenvolvimento. Algumas funcionalidades e componentes visuais ainda passam por ajustes e melhorias.

## Tecnologias utilizadas

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)

## Roadmap

### Fase 1 — Estrutura e identidade visual

- [x] Criar a estrutura inicial do cartão.
- [x] Implementar a identidade visual.
- [x] Adicionar links sociais e convites.
- [x] Implementar animações e efeitos interativos.
- [ ] Revisar a estrutura do código e os componentes existentes.
- [ ] Aprimorar a responsividade e a experiência mobile.

### Fase 2 — Integração com Discord

- [ ] Registrar uma aplicação no Discord Developer Portal.
- [ ] Implementar autenticação OAuth2.
- [ ] Permitir que usuários conectem suas próprias contas.
- [ ] Recuperar dados autorizados do perfil por meio da API.
- [ ] Exibir automaticamente nome, avatar e outras informações disponíveis.
- [ ] Criar uma experiência personalizada para usuários autenticados.

### Fase 3 — Plataforma de cartões digitais

- [ ] Permitir a criação de cartões individuais.
- [ ] Desenvolver um painel de personalização.
- [ ] Permitir a configuração de redes sociais e links externos.
- [ ] Gerar links exclusivos para compartilhamento.
- [ ] Disponibilizar opções de temas e layouts.
- [ ] Evoluir a aplicação para suportar múltiplos usuários.

## Executando o projeto

Clone o repositório:

```bash
git clone https://github.com/Santanaxy/Cart-o_de_visita_Discord.git
```

Acesse a pasta do projeto:

```bash
cd Cart-o_de_visita_Discord
```

Abra o arquivo:

```text
Site/index.html
```

Para testar a página com um servidor local, você também pode utilizar uma extensão como o Live Server no VS Code.

**Observação:** confira os caminhos dos arquivos de mídia e demais recursos antes da execução. Alguns componentes utilizam caminhos absolutos e podem exigir ajustes conforme o ambiente.

## Integração futura com a API do Discord

A autenticação será desenvolvida utilizando OAuth2, permitindo que o próprio usuário autorize a conexão entre sua conta do Discord e a plataforma.

O objetivo é importar somente as informações necessárias e autorizadas, evitando que cada pessoa precise preencher manualmente todos os dados do seu cartão.

A integração será implementada em etapas, priorizando segurança, privacidade e controle do usuário sobre as informações exibidas.

**Importante:** a autenticação com Discord ainda não está implementada na versão atual.

## Contribuições

O Discord Card é um projeto em evolução, aberto a ideias, melhorias e contribuições.

Sugestões relacionadas à interface, experiência do usuário, organização do código e integração com serviços externos são bem-vindas.

## Licença

Consulte o arquivo [LICENSE](LICENSE) para obter informações sobre a licença do projeto.

---

Desenvolvido com criatividade, código e a proposta de tornar cada identidade digital única.
