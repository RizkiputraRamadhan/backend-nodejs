## API Backend

### Admin

#### Login Admin

### POST http://localhost:5000/login

Login dengan method post

### GET http://localhost:5000/admin

Mendapatkan semua data admin

### POST http://localhost:5000/admin

Menambahkan data admin dengan method post

Content-Type: application/json

        {
            "username": "administrator",
            "password": "12345678"
        }

## Animal

### GET http://localhost:5000/animal

mendapatkan semua data animal dengan method get

### GET http://localhost:5000/animal/proses

mendapatkan data yang berstatus proses

### GET http://localhost:5000/animal/approve

mendapatkan data yang berstatus approve

### POST http://localhost:5000/animal

menambah data animal dengan method post

contoh field :

        Content-Type: application/json

        {
            "name": "Maive",
            "breed": "Maine",
            "sex": "Male",
            "age": "5",
            "color": "Hitam, kuning",
            "description": "Kucing indah pemberani yang indah dan menawan yang perlu dikasih sayangi ",
            "status_adoption": "publish"
        }

### PATCH http://localhost:5000/animal/publish/:id

mengupdate status menjadi publish sesuai id dengan method PATCH

### PATCH http://localhost:5000/animal/proses/:id

mengupdate status menjadi proses sesuai id dengan method PATCH

### PATCH http://localhost:5000/animal/approve/:id

mengupdate status menjadi approve sesuai id dengan method PATCH

### GET http://localhost:5000/animal/:id

mencari detail dari animal sesuai id yang dipilih

### PATCH http://localhost:5000/animal/1

update animal sesuai id dengan PATCH

### DELETE http://localhost:5000/animal/1

delete animal sesuai id dengan method DELETE
