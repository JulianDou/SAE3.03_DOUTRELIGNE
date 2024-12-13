<?php
require_once 'EntityRepository.php';
require_once __DIR__ . '/../Class/Client.php';

class ClientRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    public function find($id) {
        $stmt = $this->cnx->prepare("
            SELECT *
            FROM Customers
            WHERE id = :id;
        ");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result){
            return new Client(
                $result[0]['id'],
                $result[0]['firs_name'],
                $result[0]['last_name'],
                $result[0]['email'],
                $result[0]['country'],
                $result[0]['city'],
                $result[0]['lat'],
                $result[0]['lng']
            );
        }
        return false;
    }

    public function findAll(){
        $stmt = $this->cnx->prepare("
            SELECT * FROM Customers ORDER BY last_name;
        ");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result){
            $clients = [];
            foreach ($result as $row){
                $clients[] = new Client(
                    $row['id'],
                    $row['firs_name'],
                    $row['last_name'],
                    $row['email'],
                    $row['country'],
                    $row['city'],
                    $row['lat'],
                    $row['lng']
                );
            }
            return $clients;
        }
        return false;
    }

    public function save($entity){
        return false;
    }

    public function delete($id){
        return false;
    }

    public function update($entity){
        return false;
    }
    
}