# Ignite - Trilha Node.js - RentX

## Cadastro de carros
### Requisitos funcionais
- [x] Deve ser possível cadastrar um novo carro.

### Regras de negócio
- [x] Não será permitido cadastrar um carro com uma placa já existente.-
- [x] Todo novo carro cadastrado deverá estar disponível por padrão.
- [x] O usuário responsável pelo cadastro deverá ser um administrador.

## Listagem de carros
### Requisitos funcionais
- [x] Deve ser possível listar os carros cadastrados disponíveis.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

### Regras de negócio
- [x] Não é necessário estar autenticado para listar os carros disponíveis. 
- [x] Deve ser possível listar todos os carros.

## Cadastro de espeficicações no carro
### Requisitos funcionais
- [ ] Deve ser possível adicionar uma especificação em um carro.
- [ ] Deve ser possível listar todas as epecificações.
- [ ] Deve ser possível listar todos os carros.

### Regras de negócio
- [ ] O usuário responsável pelo cadastro deverá ser um administrador.
- [ ] Não será permitido adicionar uma especificação em um carro não existente.
- [ ] Não será permitido adicionar uma especificação já existente no carro.

## Cadastro de imagens do carro
### Requisitos funcionais
- [ ] Deve ser possível cadastrar imagens do carro.

### Requisitos não funcionais
- [ ] Utilizar o multer para upload dos arquivos.

### Regras de negócio
- [ ] O usuário responsável pelo cadastro deverá ser um administrador.
- [ ] O usuário deve poder cadastar mais de uma imagem para o mesmo carro.

## Aluguel de carro
### Requisitos funcionais
- [ ] Deve ser possível cadastrar o aluguel de um carro.

### Regras de negócio
- [ ] O aluguel deve ter duração mínima de 24(vinte e quatro) horas.
- [ ] Não será permitido cadastrar um novo aluguel caso já existe um aluguel ativo para o mesmo usuário.
- [ ] Não será permitido cadastrar um novo aluguel caso já existe um aluguel ativo para o mesmo carro.
- [ ] Somente usuários autenticados poderão cadastrar aluguéis.