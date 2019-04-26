# Teste CI

## Work Flow

![](./images/devops/devops_workflow.png)

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

+ Criar conta no [Travis CI](https://travis-ci.com/)

+ Criar conta na [AWS](https://portal.aws.amazon.com/billing/signup)

### 2. Política para a instância EC2
Esse passo e os seguintes são executados no AWS Management Console (encontrado em "My Account" no canto superior direito em [aws.amazon.com](https://aws.amazon.com/)).

![](./images/devops/devops_tutorial_2-1.png)

#### 2.1. Objetivo
Criar uma política no AWS Management Console para que a a instância EC2 tenha permissão para "pegar" qualquer arquivo de um serviço S3. Depois, essa política será atrelada a um "Role" para a instância EC2.

#### 2.2. Criar política
Em "Find Services", procurar por IAM.

![](./images/devops/devops_tutorial_2-2.png)

Em IAM, clicar em "Policies".

![](./images/devops/devops_tutorial_2-3.png)

Depois clicar no botão azul "Create policy" e na aba "JSON" substituir o conteúdo pelo abaixo:
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

Para ver suas políticas criadas, em IAM, "Policies", clicar em "Filter policies" e selecionar "Customer managed".

![](./images/devops/devops_tutorial_2-4.png)

### 3. Políticas para o Travis CI

#### 3.1. Objetivo
Criar duas políticas no AWS Management Console para que o Travis possa enviar arquivos para o Bucket S3 e outra para que o Travis possa "avisar" o CodeDeploy para a instância EC2 "pegar" os arquivos no Bucket. Depois, essas políticas serão atreladas a um "Role" para o Travis.

#### 3.2. Criar políticas

##### 3.2.1. Upload para o S3 Bucket
Em IAM, "Policies", clicar no botão azul "Create policy" e na aba "JSON" substituir o conteúdo pelo abaixo:

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
Clicar em "Review policy" e então dar um nome para ela como "Travis-Deploy-To-S3" e clicar em "Create policy". Essa polítiva permite o Travis fazer o upload de arquivos para o serviço AWS S3.

##### 3.2.2. Deploy para a instância EC2
Em IAM, "Policies", clicar no botão azul "Create policy" e na aba "JSON" substituir o conteúdo pelo abaixo trocando "REGIAO" pela região onde a estância está hospedada, "ACCID" pelo seu AccId e "NOMEAPLICACAOCODEDEPLOY" para um nome a sua escolha:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "codedeploy:RegisterApplicationRevision",
                "codedeploy:GetApplicationRevision"
            ],
            "Resource": [
                "arn:aws:codedeploy:REGIAO:ACCID:application:NOMEAPLICACAOCODEDEPLOY"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "codedeploy:CreateDeployment",
                "codedeploy:GetDeployment"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "codedeploy:GetDeploymentConfig"
            ],
            "Resource": [
                "arn:aws:codedeploy:REGIAO:ACCID:deploymentconfig:CodeDeployDefault.OneAtATime",
                "arn:aws:codedeploy:REGIAO:ACCID:deploymentconfig:CodeDeployDefault.HalfAtATime",
                "arn:aws:codedeploy:REGIAO:ACCID:deploymentconfig:CodeDeployDefault.AllAtOnce"
            ]
        }
    ]
}
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
