<?php
require_once 'EntityRepository.php';
require_once __DIR__ . '/../Class/Commande.php';

class CommandeRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    public function find($status): array {
        $stmt = $this->cnx->prepare("SELECT count(*) FROM Orders WHERE order_status = :status");
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            $answer = [
                'count' => $result[0]['count(*)'],
            ];
            return $answer;
        }
        return false;
    }

    public function findAll(){
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