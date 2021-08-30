#imports
import mysql.connector
import dotenv
import os

# Para uso da query
dotenv.load_dotenv()

# Criando variavel
query = os.getenv('DB_QUERY')
directory = 'C:\\Users\\naoti\\Documents\\Projetos\\estagio_IntuitiveCare\\q3\\csv'

# Criando instancia do banco
mydb = mysql.connector.connect(
  host = os.getenv('DB_HOST'),
  user = os.getenv('DB_USER'),
  password = os.getenv('DB_PASSWORD'),
  database = os.getenv('DB_DATABASE')
)

# Criando cursor
mycursor = mydb.cursor()

# Inserir todos as tabelas .csv no diretorio
for filename in os.listdir(directory):
    if filename.endswith(".csv") or filename.endswith(".py"): 
        # Printando a nome do arquivo a ser inserido
        print('\n\n\nInserindo o arquivo: ' + filename)

        # Criando a query
        sql = query.format(table = filename)

        # Executando a query
        mycursor.execute(sql)
        
        continue
    else:
        continue



# Comitando as alteracoes
myresult = mydb.commit()
print('COMIITADO')