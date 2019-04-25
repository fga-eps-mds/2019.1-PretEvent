# Teste CI

## Work Flow

<!-- imagem -->

1. Merge Pull Request na master

2. Travis faz a build do projeto e executa os testes

3. Travis faz o push das images para o DockerHub

4. Travis faz o upload dos scripts zipados para o AWS Bucket S3

5. Travis avisa o AWS CodeDeploy para a instância AWS EC2 pegar os scripts do Bucket e executá-los

6. Instância AWS EC2 atualiza os serviços em execução em um Docker Swarm fazendo o pull das images do Docker Hub

## Tutorial
1. Criar contas
2. Política para a instância EC2
3. Políticas para o Travis CI
4. Criar usuário para o Travis User no AWS IAM
5. Criar IAM Role para instância EC2
6. Criar IAM Role para a aplicação AWS Code Deploy
7. Criar a instância EC2
8. Criar o S3 Bucket
9. Configurar o Code Deploy
10. Configurar o projeto
11. Configurar as credenciais de usuário no Travis
12. Configurar o Code Deploy Agent


### 1. Criar contas

+ Criar conta no Travis CI

+ Criar conta na AWS

### 2. Política para a instância EC2
Esse passo e os seguintes são executados no AWS Management Console (encontrado em "My Account" no canto superior direito do (https://aws.amazon.com/)[https://aws.amazon.com/].
<!-- imagem -->

#### 2.1. Objetivo
Criar uma política no AWS Management Console para que a a instância EC2 tenha permissão para "pegar" qualquer arquivo de um serviço S3. Depois, essa política será atrelada a um "Role" para a instância EC2.

#### 2.2. Execução
Em "Find Services", procurar por IAM.
<!-- imagem -->
Em IAM, clicar em "Policies".
<!-- imagem -->
Depois clicar no botão azul "Create policy" e na aba "JSON", substituir o conteúdo pelo abaixo:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "s3:Get*",
                "s3:List*"
            ],
            "Effect": "Allow",
            "Resource": "*"
        }
    ]
}
```
Clicar em "Review policy" e então dar um nome para ela como "CodeDeploy-EC2-Permissions" e clicar em "Create policy".

Para ver suas políticas criadas, em IAM "Policies", clicar em "Filter policies e selecionar "Customer managed".

### 3. Políticas para o Travis CI

#### 3.1. Objetivo
Criar duas políticas no AWS Management Console para que o Travis possa enviar arquivos para o Bucket S3 e outra para que o Travis possa "avisar" o CodeDeploy para a instância EC2 "pegar" os arquivos no Bucket. Depois, essas políticas serão atreladas a um "Role" para o Travis.

#### 3.2. Execução

##### 3.2.1. Upload para o S3 Bucket
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

##### 3.2.2. Deploy para a instância EC2

```
```

### 4. Criar usuário para o Travis User no AWS IAM

### 5. Criar IAM Role para instância EC2

### 6. Criar IAM Role para a aplicação AWS Code Deploy

### 7. Criar a instância EC2

#### 7.1 Criar uma Tag para a instância EC2

### 8. Criar o S3 Bucket

### 9. Configurar o Code Deploy

### 10. Configurar o projeto

#### 10.1 travis.yml
```
```
#### 10.2 appspec.yml
```
```
### 11. Configurar as credenciais de usuário no Travis

### 12. Configurar o Code Deploy Agent

## Referências
