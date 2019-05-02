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
6. Criar IAM Role para a aplicação AWS CodeDeploy
7. Criar a instância EC2
8. Criar o S3 Bucket
9. Configurar o AWS CodeDeploy
10. Configurar o projeto
11. Configurar as credenciais de usuário no Travis
12. Configurar o AWS CodeDeploy Agent


### 1. Criar contas

+ Criar conta no [Travis CI](https://travis-ci.com/)

+ Criar conta na [AWS](https://portal.aws.amazon.com/billing/signup)

### 2. Política para a instância EC2
Esse passo e os seguintes são executados no AWS Management Console (encontrado em "My Account" no canto superior direito em [aws.amazon.com](https://aws.amazon.com/)).

![](./images/devops/devops_tutorial_2-1.png)

#### 2.1. Objetivo
Criar uma política no AWS Management Console para que a a instância EC2 tenha permissão para "pegar" qualquer arquivo de um serviço S3. Depois, essa política será atrelada a um "Role" para a instância EC2 no passo 5. desse tutorial.

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
Criar duas políticas no AWS Management Console para que o Travis possa enviar arquivos para o Bucket S3 e outra para que o Travis possa "avisar" o AWS CodeDeploy para a instância AWS EC2 "pegar" os arquivos no Bucket. Depois, essas políticas serão atreladas a um "Role" para o Travis no passo 4.

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
Em IAM, "Policies", clicar no botão azul "Create policy" e na aba "JSON" substituir o conteúdo pelo abaixo trocando "REGIAO" pelo código da região onde a istância está hospedada, "ACCID" pelo seu AccId e "NOMEAPLICACAOCODEDEPLOY" para um nome a sua escolha:
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
A região onde a istância está hospedada pode ser encontrada no AWS Management Console em EC2 Dashboard: 

![](./images/devops/devops_tutorial_3-1.png)

O código da região que deve ser trocado pode ser encontrado nessa [tabela](https://docs.aws.amazon.com/general/latest/gr/rande.html#codedeploy_region)

O AccId pode ser encontrado no Dashboard do IAM. O AccId é a sequência de números no começo do link para login de usuários do IAM:

![](./images/devops/devops_tutorial_3-2.png)

O "NOMEAPLICACAOCODEDEPLOY" escolhido será usado no passo 9.

Clicar em "Review policy" e então dar um nome para ela como "Travis-Code-Deploy-Policy" e clicar em "Create policy".


### 4. Criar usuário para o Travis User no AWS IAM
Em IAM, clicar "Users", e depois clicar no botão azul "Add user". Então dar um nome para o usuário como "Travis", selecionar "Programmatic access" em "Access type" e clicar no botão azul "Next: Permissions".

Selecionar "Attach existing policies directly" em "Set permissions", clicar em "Filter policies" e selecionar "Customer managed".

![](./images/devops/devops_tutorial_4-1.png)

Então selecionar as duas políticas criadas anteriormente (passos 3.2.1. e 3.2.2.), "Travis-Deploy-To-S3" e "Travis-Code-Deploy-Policy" e clicar no botão azul "Next: Tags". Clicar em "Next: Review" e depois em "Create user".

Você será direcionado para a tela se "Success" do "Add user". Nessa tela você deve copiar e guardar o "Access key ID" e o "Secret access key" (que só será exibido uma única vez nessa tela) para utilizarmos no passo 10.1. e 11.

![](./images/devops/devops_tutorial_4-2.png)

### 5. Criar IAM Role para instância EC2
Em IAM, clicar em "Roles" e depois clicar no botão azul "Create role". Em "Select type of trusted entity" selecionar "AWS service", em "Choose the service that will use this role" selecionar "EC2" e clicar no botão azul "Next: Permissions".

Clicar em "Filter policies", selecionar "Customer managed", selecionar nossa primeira política criada (no passo 2.2.) "CodeDeploy-EC2-Permissions" e clicar no botão azul "Next: Tags". Depois clicar em "Next: Review", dar um nome para o IAM Role como "CodeDeploy_EC2_DEPLOY_INSTANCE" e finalmente clicar em "Create role". Esse Role será usado no passo 7.


### 6. Criar IAM Role para a aplicação AWS CodeDeploy
Em IAM, clicar em "Roles" e depois clicar no botão azul "Create role". Em "Select type of trusted entity" selecionar "AWS service", em "Choose the service that will use this role" selecionar "Codedeploy", em "Select your use case" selecionar "Codedeploy" e clicar no botão azul "Next: Permissions". Depois clicar em "Next: Tags", depois em "Next: Review", dar um nome para o IAM Role como "CodeDeployServiceRole" e finalmente clicar em "Create role". Esse Role será usado no passo 9.

### 7. Criar a instância EC2
Em "Find Services" no AWS Management Console, procurar por "EC2". 

![](./images/devops/devops_tutorial_2-2.png)

No EC2 Dashboard clicar no botão azul "Launch Instance". Selecionar a Amazon Machine Image. Nesse tutorial vamos utilizar o Ubuntu Server. Clicar no botão azul "Select" correspondente.

![](./images/devops/devops_tutorial_7-1.png)

Depois clicar no botão "Next: Configure Instance Details" e selecionar o role "CodeDeploy_EC2_DEPLOY_INSTANCE" criado anteriormente para a instância EC2 em IAM role e clicar no botão "Next: Add Storage":

![](./images/devops/devops_tutorial_7-2.png)

Clicar no botão "Next: Add Tags" e depois no botão "Add Tag" e dar uma Key e um Value de sua preferência (essa tag será usado no passo 9.). Clicar no botão azul "Review and Launch" e finalmente clicar no botão azul "Launch".

### 8. Criar o S3 Bucket
Em "Find Services" no AWS Management Console, procurar por "S3".
Clicar no botão azul "Create bucket", entrar com um nome para o bucket (que será usado no passo 10.1.), clicar "Next", "Next", "Next" e por fim em "Create bucket".

### 9. Configurar o CodeDeploy
Em "Find Services" no AWS Management Console, procurar por "CodeDeploy" e então clicar no botão laranja "Create application". 
Em "Application name" colocar o "NOMEAPLICACAOCODEDEPLOY" escolhido no passo 3.2.2, em "Compute platform" escolher "EC2/On-premises" e clicar no botão laranja "Create application".

![](./images/devops/devops_tutorial_9-1.png)

Após a criação da aplicação, você será direcioando para a tela de detalhes da aplicação. Então clicar no botão laranja "Create deployment group":

![](./images/devops/devops_tutorial_9-2.png)

Em "Deployment group name" entre com um nome de sua escolha e em "Service Role" selecionar o IAM Role "CodeDeployServiceRole" criado no passo 6.

![](./images/devops/devops_tutorial_9-3.png)

Em "Environment configuration" selecionar "Amazon EC2 instances" e adicionar a Key e o Value da Tag criada no passo 7.

![](./images/devops/devops_tutorial_9-5.png)

Em "Load balancer" deselecione "Enable load balancing" e clique no botão laranja "Create deployment group".

![](./images/devops/devops_tutorial_9-4.png)

Por enquanto terminamos com as configurações no AWS Management Console (ufa). Faltou configurar o security group da instância (para que ela possa ser exposta para o mundo) e criar mais instâncias para usarmos no nosso Swarm, mas faremos isso futuramente. (Passo X.X e X.X)

### 10. Configurar o projeto
Vamos configurar dois arquivos, .travis.yml e appspec.yml, na raiz do projeto para que tudo funcione corretamente.

#### 10.1. .travis.yml
Considerando que os services, language e outros já estejam configurados no .travis.yml, acrescentar essas linhas trocando o "NOMEPASTA",  "NOMEBRANCH", "NOMEBUCKET", "REGIAODOBUCKET", "NOMEAPLICACAOCODEDEPLOY", "NOMEDEPLOYMENTGROUP" e "REGIAO":
```
deploy:
- provider: s3
  access_key_id: $AWS_ACCESS_KEY
  secret_access_key: $AWS_SECRET_KEY
  local_dir: NOMEPASTA
  skip_cleanup: true
  on:
    branch: NOMEBRANCH
  bucket: NOMEBUCKET
  region: REGIAODOBUCKET
- provider: codedeploy
  access_key_id: $AWS_ACCESS_KEY
  secret_access_key: $AWS_SECRET_KEY
  bucket: NOMEBUCKET
  key: latest.zip
  bundle_type: zip
  application: NOMEAPLICACAOCODEDEPLOY
  deployment_group: NOMEDEPLOYMENTGROUP
  region: REGIAO
  on:
    branch: NOMEBRANCH
script:
  - zip -r latest *
  - mkdir -p NOMEPASTA
  - mv latest.zip NOMEPASTA/latest.zip
```
$AWS_ACCESS_KEY e $AWS_SECRET_KEY permanecem assim e não devem ser trocadas. Foram geradas no passo 4 e serão configuradas no passo 11.

"NOMEPASTA" deve ser trocado por um nome a sua escolha.
"NOMEBRANCH" deve ser trocado pelo nome de uma branch do seu repositório para que seja feito o deploy nela.
"NOMEBUCKET" deve ser o nome do bucket criado no passo 8.
"REGIAODOBUCKET" pode ser encontrado no dashboard do S3. Utilizar o código da região como feito no passo 3.2.2.

![](./images/devops/devops_tutorial_10-1.png)

"NOMEAPLICACAOCODEDEPLOY" deve ser trocado pelo nome dado no passo 3.2.2.
"NOMEDEPLOYMENTGROUP" deve ser trocado pelo "Deployment group name" escolhido no passo 9.
E "REGIAO" deve ser trocado pelo código da região como feito no passo 3.2.2.


#### 10.2. appspec.yml
Criar um arquivo na raiz do projeto com o "appspec.yml" e digitar o seguinte conteúdo:
```
version: 0.0
os: linux
files:
  - source: ./
    destination: /home/ubuntu/ALGUMAPASTA
```
Trocar "ALGUMAPASTA" por um nome de pasta que será criado na instância EC2.

### 11. Configurar as credenciais de usuário no Travis
Acesse [travis-ci.com](https://travis-ci.com), procure por seu repositório e clique nele, vá em "More options" e clique em "Settings". Vá até "Environment Variables" e adicione uma variável com o nome "AWS_ACCESS_KEY" com o valor gerado no passo 4 e clique em "Add", e adicione uma variável com o nome "AWS_SECRET_KEY" com o valor também gerado no passo 4 e clique em "Add".

### 12. Configurar o CodeDeploy Agent
Para que o CodeDeploy possa funcionar corretamente, ele deve estar em execução na instância EC2 criada no passo 7.
As instruções a seguir podem ser encontradas [aqui](
https://docs.aws.amazon.com/codedeploy/latest/userguide/codedeploy-agent-operations-install-ubuntu.html).

Conectar-se na sua instância EC2 executar os seguites comandos:
```
sudo apt-get update

sudo apt-get install python-pip

sudo apt-get install ruby2.0

sudo apt-get install wget

cd /home/ubuntu
```
Aqui, trocar "REGIAO", pelo código da região como no passo 3.2.2.:
```
wget https://aws-codedeploy-REGIAO.s3.amazonaws.com/latest/install
```
Instalar:
```
chmod +x ./install

sudo ./install auto
```
Para verificar se o CodeDeploy Agent está em execução:
```
sudo service codedeploy-agent status
```


## Referências
https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html
https://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html
https://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-codedeploy.html
https://docs.travis-ci.com/user/deployment/codedeploy/
https://medium.com/@itsdavidthai/comprehensive-aws-ec2-deployment-with-travisci-guide-7cafa9c754fc
