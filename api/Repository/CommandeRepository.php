<?php
require_once 'EntityRepository.php';
require_once __DIR__ . '/../Class/Commande.php';

class CommandeRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    public function findStatus($status) {
        $stmt = $this->cnx->prepare("SELECT * FROM Orders WHERE order_status = :status");
        $stmt->bindParam(':status', $status, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            return new Commande($result['id'], $result['customer_id'], $result['order_date'], $result['order_status'], $result['weight'], $result['shipping_cost']);
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