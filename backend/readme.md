# Instrução simples de como rodar o container do app

1 - Clona o repositório para o local e entra dentro da pasta:
```bash
git clone https://github.com/Livia2710/Controle_Certificados.git

cd Controle_Certificados
```

2 - Roda o docker compose buildando a primeira vez e deixando em background:
```bash
docker compose up --build -d
```

# Importante:
Ainda em ambiente de dev, os dois containers escutam as seguintes portas:
- Python API -> http://localhost:5000
- MySQL DB -> http://localhost:3306

Se for conectar com o MySQL usando o MySQL workbanch ou o DBeaver, tem que configurar as credenciais puxando do "docker-compose.yml"