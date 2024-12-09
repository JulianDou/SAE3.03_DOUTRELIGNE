<?php
require_once 'EntityRepository.php';
require_once __DIR__ . '/../Class/Commande.php';

class CommandeRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    public function find($status): array {
        $stmt = $this->cnx->prepare("SELECT * FROM Orders WHERE order_status = :status");
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            $commandes = [];
            foreach ($result as $obj) {
                $commande = new Commande($obj['id'], $obj['customer_id'], $obj['order_date'], $obj['order_status'], $obj['weight'], $obj['shipping_cost']);
                array_push($commandes, $commande);
            }
            return $commandes;
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