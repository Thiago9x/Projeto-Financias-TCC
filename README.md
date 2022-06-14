# Royal Finance

Um aplicativo multiplataforma 
para o controle de financas pessoais,
com multiplas funcionalidades implementadas,
desde cadastro de despesas à gráficos dinâmicos.

O Back-End está armazenado nesse repositório.

## Sobre

Royal Finance é um projeto acadêmico criado e testado
para fins de Trabalho de Conclusão de Curso, contendo dezenas
de funcionalidades feitas para satisfazer cada tipo de usuário.

Algumas funcionalidades disponíveis no sistema:
- Login e Cadastro com informações criptografadas
- Recuperação de senha por email
- Login automático
- Cadastro de receita e despesa (transferências)
- Categorias para transferências
- Transferências parceladas
- Transferências favoritas
- Transferências com imagem
- Dinheiro gasto e recebido atual
- Saldo por mês
- Transferências fixas¹
- Perfil customizado do usuário
- Imagem do usuário
- Gráfico do saldo diário/semanal/mensal
- Gráfico por categorias
- Verificação de duas etapas²
- Extrato das transferências
- Metas/limites para o saldo²
- Contas em grupo²

¹ Transferências fixas são aquelas que acontecem toda
dia, semana ou mês. O sistema cadastra automaticamente
a despesa ou receita de acordo com a frequência especificada.

² Funcionalidade parcialmente implementada.

## Projetos relacionados

- [Back-End API](https://github.com/Thiago9x/Projeto-Financias-TCC)
- [Front-End Android](https://github.com/thiagoJoseB/RoyalApp)
- [Design Figma](https://www.figma.com/file/yuXiTWSRzPmPKzbKeQienQ/Finanças-pessoais?node-id=0%3A1)

## Uso

Para a construção do projeto, é necessário o uso do 
[Maven](https://maven.apache.org/) para gerar o arquivo
.WAR, onde ele pode ser executado em qualquer servidor 
compatível com Jakarta EE 9
([Apache Tomcat](https://tomcat.apache.org/),
[Eclipse Glassfish](https://glassfish.org/)) que esteja
rodando no Java 17, além de um banco de dados MySQL/MariaDB.
Mudar o caminho declarada em url no arquivo link.js 

## Linguagens e bibliotecas

- JS6: JavaScript 2015 utilizando const e let
- JS7: JavaScript 2016 utilizando assyc e await
- Bibliotecas: chart.js, cookie.js e API fetch
- Bootstap para facilidades de alguma funcionalidades

## Licença

Domínio público, todo cógido disponível neste repositório 
pode ser utilizado em qualquer lugar.
