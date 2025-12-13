<<<<<<< HEAD
# Código Fonte

A pasta `codigo` serve para a manter o programa que vocês vão construir no contexto dessa disciplina. Se necessário, descreva neste arquivo aspectos relevantes da estrutura de diretórios criada para organização do código do seu projeto.

**IMPORTANTE**: O uso do JSON Server e do ambiente baseado no Node.js é obrigatório.

Uma sugestão da estrutura de diretórios para o projeto é a seguinte:

```plaintext
codigo/  (essa pasta aqui)
│
├── db/
│   └── db.json (estruturas de dados)
│
├── public/ (seu site - front end)
│   ├── assets/
│   │   ├── css/
│   │   │   ├── styles.css
│   │   │   └── (outros arquivos .css)
│   │   │
│   │   ├── js/
│   │   │   ├── app.js
│   │   │   └── (outros arquivos .js)
│   │   │
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   └── (outras imagens)
│   │   │
│   │   └── fonts/
│   │       ├── font1.ttf
│   │       └── (outras fontes)
│   │
│   ├── modulos/
│   │   ├── modulo-1/
│   │   │   └── (arquivos do módulo)
│   │   │
│   │   └── modulo-2/
│   │       └── (arquivos do módulo)
│   │
│   ├── index.html (página inicial front end)
│   ├── about.html
│   ├── contact.html
│   └── (outras páginas)
│
│── index.js (app back end)
│── package.json (configuração back end)
└── README.md (este arquivo aqui)
```

## Parte Front End

Para montar seu site, edite os arquivos existentes e crie novos arquivos na pasta `public` que mantem todos os arquivos da parte de Front End do site, a interface que é vista pelo usuário no navegador.

Nesta pasta public, sugerimos que você organize os arquivos do seu site da seguinte maneira:

* Arquivo `index.html`: arquivo que representa a "home page" do site.
* Pasta `assets`: os arquivos de formatação (CSS), os scripts (JS), as imagens utilizadas no site (JPG, PNG, GIF, SVG, etc), fontes (TTF) e outros arquivos gerais utilizados por todo o site.
* Pasta `modulos`: os arquivos utilizados na implementação das funcionalidades do site. Separe uma sub-pasta para cada novo módulo ou funcionalidade. Pode também ser utilizado para dividir o trabalho de cada membro do grupo.


## Parte Back End

Para esse projeto, vamos utilizar o ambiente de execução **[Node.js](https://nodejs.org/)** para montar um Back End bem simplificado, porém poderoso que utiliza o módulo **[JSON Server](https://github.com/typicode/json-server#readme)**. Não se preocupe, você não precisa conhecer como programar para o ambiente Node.js e nem alterar estes arquivos para colocar o seu site funcionando.

Na pasta `codigo`, você vai encontrar os seguintes arquivos e pastas associados à estrutura de Back End:

* Pasta `db`: local onde é armazenado o arquivo com as estruturas de dados utilizadas pela aplicação. O conteúdo é composto apenas pelo arquivo `db.json`.
* Arquivo `index.js`: arquivo que inicializa o módulo JSON Server que oferece um servidor web e a aplicação de back end que fornece uma API RESTful a partir do arquivo `db.json`. Evite alterar o arquivo `index.js`.
* Arquivo `package.js`: arquivo com as configurações do projeto Node.js.

## Configuração e execução do ambiente

Para executar o JSON Server e permitir o acesso ao seu site, você deverá instalar o Node.js no seu computador. Para isso siga as instruções no site do [**Node.js**](https://nodejs.org/), fazendo o download da versão LTS (versão mais estável do ambiente).

Assim que o Node.js estiver instalado no seu computador, siga os passos a seguir:

1. Abra a pasta `codigo` dentro da sua IDE (por exemplo, Visual Studio Code)
2. Abra uma janela de terminal e certifique-se que a pasta do terminal é a pasta `codigo`
3. Execute o comando `npm install` para recriar a pasta `node_modules` e instalar todos os pacotes necessários para o ambiente de desenvolvimento (Ex: JSON Server).
4. Execute o comando `npm start` para iniciar o JSON Server e permitir que você consiga acessar o seu site no navegador.
5. Para testar o projeto:
   1. **Site Front End**: abra um navegador e acesse o seu site pela seguinte URL:
      [http://localhost:3000]()
   2. **Site Back End**: abra o navegador e acesse as informações da estrutura de usuários por meio da API REST do JSON Server a partir da seguinte URL:
      [http://localhost:3000/usuarios](http://localhost:3000/usuarios)


## Dúvidas e Suporte

Se tiver dúvidas, procure a monitoria para que te ajudem a entender todo o ambiente e te ajudem na implementação do seu projeto.

### Documentação JSONServer
A documentação do JSONServer pode ser consultada na [página do módulo no NPM](https://www.npmjs.com/package/json-server/v/0.17.4).

### Portal de exemplos da disciplina DIW 
Temos um site de exemplo de como implementar diversas funcionalidades úteis para projetos Web no contexto da disciplina. Acesse o [site de exemplo](https://github.com/webtech-network/lab-jsonserver). 

Para implementação de funcionalidades avançadas, sugerimos o uso das seguintes bibliotecas/APIs: [FullCalendar](https://fullcalendar.io/), [Chart.js](https://www.chartjs.org/), [Mapbox](https://docs.mapbox.com/api/), para citar algumas.
=======
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=20506235)
# Wise Capital

Wise Capital é uma solução que ajuda pessoas a entender melhor o mercado financeiro e tomar decisões de investimento mais conscientes e seguras.  
O projeto oferece informações claras, acessíveis e ferramentas que promovem autonomia, segurança e confiança para diferentes perfis de investidores.

## Repositório do Projeto

O repositório completo deste projeto está disponível em:  
[https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti1-g10-dificuldade-de-investimento/tree/master](https://github.com/ICEI-PUC-Minas-PMGCC-TI/ti1-g10-dificuldade-de-investimento/tree/master)

## Alunos integrantes da equipe

- Davi Cândido Rodrigues da Silveira
- Hendryo Otávio Rodrigues
- Samuel Scarabelli Amarante
- Victório Pinto da Silva Neto

## Professores responsáveis

- João Carlos Oliveira Caetano
- Luciana Mara Freitas Diniz 
- Rommel Vieira Carneiro

# Contexto do Projeto

O mercado financeiro apresenta desafios para diferentes perfis de investidores, devido à variedade de produtos e a complexidade das informações. Muitas pessoas têm dificuldade em tomar decisões de investimento conscientes, seja por falta de conhecimento ou por dificuldade em interpretar dados financeiros. Plataformas digitais, corretoras e consultorias tentam fornecer ferramentas e orientações, mas a forma como essas informações são acessadas e aplicadas na prática é um grande problema.

# Problema

Muitas pessoas enfrentam dificuldades para investir de forma consciente e segura devido à complexidade do mercado financeiro, à variedade de produtos disponíveis e à dificuldade de interpretar informações econômicas e financeiras. Isso pode levar a decisões inadequadas, riscos desnecessários ou até prejuízos financeiros. Atualmente, as ferramentas e orientações disponíveis nem sempre são suficientes para guiar os investidores de forma prática e eficiente.

# Objetivo do Projeto

Objetivo geral:

- Criar uma solução que auxilie pessoas a compreender melhor o mercado financeiro e tomar decisões de investimento mais conscientes e seguras.

Objetivos específicos:

- Oferecer uma interface simples e acessível em diferentes dispositivos.

- Explicar investimentos em linguagem clara.

- Estimular autonomia na tomada de decisões financeiras.

# Justificativa

Muitas pessoas têm dificuldades para investir, seja pela falta de conhecimento técnico ou pela insegurança diante das opções disponíveis. Enquanto alguns usuários, como a Célia(persona), buscam complementar a renda e manter independência, outros, como o Matheus(persona), desejam planejar o futuro financeiro e alcançar autonomia.

Diante desse cenário, o projeto se justifica pela necessidade de oferecer uma solução acessível, clara e confiável, que ajude diferentes perfis de pessoas a compreender melhor o mercado financeiro, ganhar confiança e tomar decisões mais seguras.

# Público-alvo

O público-alvo são pessoas que desejam investir, mas enfrentam dificuldades para compreender o mercado financeiro. Inclui tanto usuários com pouca familiaridade com tecnologia e que buscam complementar a renda (como aposentados), quanto jovens trabalhadores que almejam independência financeira e mais autonomia em suas decisões.

Esses usuários geralmente possuem apenas conhecimentos básicos sobre finanças, utilizam principalmente o celular e, em alguns casos, o computador, e valorizam soluções que sejam simples, claras e confiáveis.

# Processo de Product Discovery
* Matriz CSD: 
Certezas, o que já sabemos: 
* Os brasileiros possuem dificuldade em investir.
* Existem muitos aplicativos e plataformas de investimento no mercado, mas a maioria é complexa ou voltada para investidores mais experientes.
* Muita gente não consegue investir simplesmente porque nunca aprendeu a lidar bem com o próprio dinheiro.
* Muitas pessoas tem dificuldade em entender conceitos básicos sobre investimentos simplesmente por nunca terem estudado ou sequer tiveram contato com o assunto.

Suposições, o que achamos, mas não temos certeza:
* A pessoa acha que precisa de muito dinheiro para investir.
* Termos usados em conteúdo da internet afastam iniciantes por não serem dinâmicos/literais.
* O medo de perder dinheiro é maior do que a vontade de ganhar.
* Ideais engessados como “poupança é o melhor investimento”.
* Investir é só pra quem quer enriquecer rápido.
* A pessoa achar que é novo/velho demais para investir.

Dúvidas, o que ainda não sabemos:
* Qual é o nível de conhecimento financeiro dos nossos potenciais usuários?
* Quais são os principais medos e barreiras emocionais que os impedem de começar a investir?
* Os nossos potenciais usuários possuem alguma limitação financeira?
* Os nossos potenciais usuários realmente procuram saber mais sobre o assunto antes mesmo de pensarem em fazer algum investimento?
* Valor que vai ser guardado/ investido mensalmente.

* Mapa de stakeholders: 
Pessoas Fundamentais:
* Investidores.
* Aposentados.
* Pessoas com capital parado.
* Pessoas que não sabem sobre investimentos financeiros.

Pessoas Importantes:
* Economistas.
* Bancos.
* Empreendedores.
* Contadores.
* Pessoas financeiramente bem sucedidas.

Pessoas Influenciadoras:
* Bolsa de Valores.
* Órgãos Financeiros.
* Governo Federal.
* Criadores de conteúdo digital.
* Trabalhadores
* Corretoras de Investimentos.

* Entrevistas qualitativas: 
As entrevistas qualitativas nos ajudaram a entender, analisar e esclarecer dúvidas que tivemos na construção do Mapa de Stakeholders. Utilizamos o próprio quadro para formular as perguntas das entrevistas e obtivemos respostas satisfatórias para colaborar para o desenvolvimento do projeto. 

As perguntas nas entrevistas foram baseadas, mas não necessariamente exclusivas, ao seguinte roteiro: 
1. Você investe ou já pensou em investir?
2. Você acredita que precisa de muito dinheiro para investir?
3. Quais as suas preocupações em relação a investimentos?
4. Você acha o conteúdo disponível na internet sobre investimentos complicado de entender?
5. Na sua opinião existe uma idade certa para começar a investir?
6. Quais tipos de investimentos você conhece?

Ao final das entrevistas, obtivemos o seguinte conjunto de respostas:
1. Todos os entrevistados já ouviram falar de investimentos, porém uma pequena minoria já investiu antes.
2. A maioria dos entrevistados reforçaram a suposição de que é necessário ter muito dinheiro para investir, eles acreditam que não há pequenas formas de investimento.
3. A grande preocupação dos entrevistados é perder dinheiro com investimentos.
4. Poucos entrevistados sequer já procuraram sobre investimentos na internet, os que já pesquisaram sobre consideram o conteúdo da internet difícil e pouco intuitivo, complicado de entender.
5. Entrevistados consideram a idade ideal para começar a investir é o quanto antes puder.
6. Os tipos de investimento que os entrevistados conhecem foram Bolsa de Valores, Crypto, Fundos Imobiliários, Renda Fixa, Poupança e Tesouro Direto. Alguns entrevistados consideram Apostas e Jogos de Azar como investimentos.

* Highlights de pesquisa: 
O que os participantes falaram ou fizeram que surpreendeu, ou falas mais significativas: 
* Participantes consideram o Brasil como pouco atrativo para investimentos por conta de barreiras fiscais, preferem investir no mercado internacional. 
* Participantes consideram que é necessário ter muito dinheiro para investir.
* Alguns participantes consideram Apostas e Jogos de Azar como investimento.
* Alguns participantes conhecem apenas Poupança como forma de investimento e consideram ela a melhor opção.

Principais temas ou aprendizados que surgiram desta entrevista:
* Existe uma tendência de preferência pelo mercado externo
* A insegurança para investimentos é um fator constante com alta intensidade
* Educação precária e falta de incentivo são fatores constantes
* Pouca clareza sobre conteúdos de investimentos

Aspectos que importam mais para os participantes:
* Segurança e simplicidade nas opções de investimentos
* Certeza do retorno financeiro 
* Necessidade de capital inicial considerável
* Pouca interferência no dinheiro por parte de terceiros (Bancos, Governo)

Novos tópicos ou questões para explorar no futuro:
* Direcionar os investidores para o tipo de investimento adequado e de interesse do indivíduo
* Quais seriam os riscos e os benefícios de incluir investimentos no exterior como opção?
* Por que as pessoas não se interessam por investimentos?
* Seria interessante ter uma forma de simular investimentos como forma de aprendizado
* Como apresentar e abordar conteúdos sobre investimentos que fique didático para iniciantes

* Personas:
Persona 1 – Célia Soares
•	Idade: 65 anos
•	Hobby: Jardinagem
•	Trabalho: Aposentada
•	Personalidade: Senhora calma, modesta e dedicada à família. Tem três filhos adultos e cinco netos pequenos. Preza pela tranquilidade e por manter certa independência sem precisar depender dos filhos.
•	Sonhos: Garantir uma renda extra além da aposentadoria, pois não pretende voltar ao mercado de trabalho. Quer se sentir autossuficiente e não ser vista como um peso para a família.

Objetos e Lugares Utilizados:
•	Celular: único dispositivo digital, usado para se comunicar com os filhos, assistir vídeos e interações básicas.
•	Quadro/Planilha física: usado para organizar tarefas diárias de forma simples e visual.

Objetivos-Chave com o Serviço:
•	Complementar sua aposentadoria com segurança.
•	Se sentir capaz de tomar decisões financeiras próprias.
•	Ter clareza sobre investimentos sem linguagem técnica complexa.

Como Devemos Tratá-la:
•	Usar paciência e linguagem acessível, evitando jargões técnicos.
•	Valorizar cada pequeno progresso, reconhecendo seus esforços.
•	Proporcionar simplicidade, fluxos claros e passo a passo.
•	Criar uma sensação de acolhimento e confiança ao longo da experiência.

Persona 2 – Matheus Silva
•	Idade: 25 anos
•	Hobby: Jogos online (PC)
•	Trabalho: Dedetizador
•	Personalidade: Introvertido e caseiro, prefere momentos com a família e atividades dentro de casa a sair. É prático, busca independência financeira e sonha em viver sem depender de um trabalho fixo presencial.
•	Sonhos: Conquistar independência financeira e transformar o trabalho em uma fonte secundária de renda, e não em sua base de sobrevivência.

Objetos e Lugares Utilizados:
•	Smartphone: usado para redes sociais, mensagens e comunicação.
•	PC: utilizado para jogos, lazer e estudos online.
•	Agenda: utilizada para organização e controle financeiro manual.

Objetivos-Chave com o Serviço:
•	Entender como investir de forma descomplicada e prática.
•	Acompanhar a evolução de seus investimentos de forma clara.
•	Construir um plano para sua independência financeira a longo prazo.

Como Devemos Tratá-lo:
•	Usar uma linguagem clara e objetiva, traduzindo termos técnicos em exemplos fáceis.
•	Oferecer suporte que responda todas as dúvidas, mesmo as mais básicas.
•	Valorizar pequenos avanços com feedback positivo.
•	Criar uma interface intuitiva, com possibilidade de personalização para seus objetivos financeiros.
•	Incentivá-lo a explorar mais o mundo dos investimentos, fortalecendo sua confiança.

Após a análise das personas, concluímos que:
•	Célia representa o público mais sênior, que busca simplicidade, acolhimento e autonomia básica no mundo dos investimentos.
•	Matheus representa o público jovem-adulto, familiarizado com tecnologia, mas que precisa de uma abordagem simplificada e estratégica para ganhar confiança e conquistar independência financeira.

# Processo de Product Design
* Histórias de usuários – 
1. Eu como: Persona Aposentada
Preciso de: Interface simples e intuitiva
Para: Aprender e desenvolver conhecimento financeiro

2. Eu como: Trabalhador CLT
Preciso de: Acessar opções de investimentos simples e progresso do meu dinheiro
Para: Investir e garantir minha independência financeira

3. Eu como: Jovem universitário
Preciso de: Acessos a cursos rápidos e tutoriais sobre finanças
Para: Aprender a organizar meu dinheiro e investir cedo

4. Eu como: Investidor iniciante
Preciso de: Recomendações personalizadas de acordo com o meu perfil
Para: Tomar decisões mais seguras

5. Eu como: Consultor financeiro
Preciso de: Acompanhar o aprendizado dos usuários
Para: Oferecer orientações mais precisas para cada pessoa

* Proposta de Valor – 
Persona 1
•	Ganhos do cliente:
Organizar melhor suas finanças para complementar a aposentadoria.
Ter satisfação ao perceber seu próprio progresso e ver o esforço reconhecido.
Ser reconhecida pela família como alguém que cuida bem do próprio dinheiro.
•	Tarefas do cliente:
Entender como funcionam os principais tipos de investimento.
Sentir-se mais confiante e independente nas decisões sobre seu futuro.

•	Dores do cliente:
Pouca familiaridade com ferramentas online que poderiam facilitar o aprendizado.
Vergonha de admitir que não entende do assunto diante de pessoas mais jovens.
Ansiedade por não saber se conseguirá realmente aprender e aplicar o conhecimento.

•	Criadores de ganhos:
Proporciona satisfação pessoal pelo aprendizado contínuo.
Ajuda a planejar aposentadoria e renda extra.

•	Produtos e Serviços:
Sistema simples: acessível

•	Analgésicos:
Conteúdo acessível e em linguagem simples, sem jargões técnicos.
Ambiente seguro, sem pressão para investir de verdade antes de entender.
Passo a passo guiado para criar confiança ao aprender.

Persona 2
•	Ganhos do cliente:
Receber premiações simbólicas por investimentos bem
Ter um app de investimentos que simplifica questões complexas
Ver gráficos e relatórios sobre a evolução do dinheiro.
Sentir satisfação e orgulho de conquistar autonomia financeira.
Alívio por não precisar depender apenas do trabalho presencial

•	Tarefas do cliente:
Aprender e se planejar para investir e acompanhar a evolução de seus investimentos
Compartilhar pequenas conquistas financeiras com pessoas próximas
Sentir segurança e confiar nas tomadas de decisão de investimentos e se motivar quando tomar decisões corretas

•	Dores do cliente:
Não pedir ajuda por achar suas dúvidas serão motivo de piada
Medo de perder dinheiro por não saber onde aplicar
Ansiedade por não saber se está fazendo as escolhas certas.
Falta de conhecimento técnico para entender termos e estratégias de investimento.
Dificuldade em organizar e visualizar objetivos a longo prazo

•	Criadores de ganhos:
Sistema de metas e premiações quando elas forem alcançadas
Dashboard intuitivo com gráficos, relatórios e evolução do dinheiro
•	Produtos e Serviços:
Suporte com chatBot e aba de FAQ
Ferramentas de planejamento e acompanhamento de metas financeiras
Sistema que permita o compartilhamento em redes sociais "Eu alcancei X metas!!!"

•	Analgésicos:
"Dicionário" de termos e jargões utilizados
Simuladores de cenários a longo prazo
Sistema de Fake Currency para que o usuário possa fazer investimentos no mercado atual, porém com uma moeda do próprio app que não possui valor

* Requisitos do projeto 
Funcionais: 
•	O sistema deve permitir refazer lições anteriores - alguns usuários não possuem base erraram muito, logo devem ter a oportunidade de realizar
•	Sistema de pontuação e recompensas - Recompensas, conquistas e pontuação para incentivar os usuários
•	Lições interativas - O sistema deve apresentar exercícios em diferentes formatos: múltipla escolha, verdadeiro ou falso, arrastar e soltar, preencher lacunas.
•	Interface - Interface intuitiva e direta, para não distrair o usuário durante o uso
•	Sistema de simulações - O usuário poderá fazer simulações a longo prazo e utilizar a moeda sem valor do app para simular investimentos no mercado atual
•	Sistema de Scorestreaks - Implementação de um sistema de assiduidade, que incentive o usuário a utilizar o app todos os dias
•	Sistema de notificações – Alertas de prazos, mudanças em algum tipo de sistema, lembretes
•	Suporte - Implementação um "Dicionário de termos utilizados na área e uma aba de FAQ
•	Questionamento quando usar o app pela primeira vez - Quando o usuário entrar no app pela primeira vez, seria interessante fazer algumas perguntas para preparar o app de acordo com o conhecimento do usuário

Não funcionais: 
•	Responsividade em diferentes aparelhos - O sistema deve ser compatível com diferentes tamanhos de tela
•	Proteção de dados - O sistema deve proteger os dados privados do usuário
•	Performance - sistema tem que ser leve para carregar em diferentes máquinas, até nas mais básicas

* Projeto de Interface
    * Fluxo do usuário - apresente o mapa de todo o fluxo de telas do site ou app. Essa técnica funciona para alinhar os caminhos e as possíveis ações que o usuário pode fazer junto com os membros de sua equipe.
    * Wireframes - protótipos das telas da aplicação usados em design de interface para sugerir a estrutura de um site web e seu relacionamentos entre suas páginas. Um wireframe web é uma ilustração semelhante ao layout de elementos fundamentais na interface.
    * Protótipo Interativo - inclua o link do ambiente que permite ao usuário navegar pelas funcionalidades como se estivesse lidando com o software pronto.
 
  # Metodologia
* Ferramentas:
•	Gestão: Discord, WhatsApp e Miro
•	Design: Figma
•	Desenvolvimento: VSCode, JavaScript, HTML, CSS
•	Controle de Versão: Git e GitHub
* Organização da equipe e divisão de papéis:
O grupo se organizou de maneira independente utilizando o ambiente de aprendizado Miro, de maneira que um pode ver no que o outro está trabalhando em tempo real, facilitando assim o controle de qualidade e gestão do projeto. A divisão de papéis e tarefas se deu de maneira que cada um se voluntaria para fazer uma parte do trabalho, sempre se adaptando a tarefa da semana.
* Quadro de controle de tarefas (Kanban) - apresente a estrutura do quadro de gerenciamento de tarefas e inclua telas com o kanban preenchido, mostrando as atividades já realizadas e ainda pendentes.
>>>>>>> 41eb7ddd1e5d5bb1cc5a556a9f7233ff79e03127
