<?php
require_once 'EntityRepository.php';
require_once __DIR__ . '/../Class/Produit.php';

class ProduitRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    public function find($mode): array {
        if ($mode == "top3"){            
            $stmt = $this->cnx->prepare("
                SELECT product_id, SUM(quantity) as total_quantity
                FROM OrderItems
                WHERE order_id IN (
                    SELECT id
                    FROM Orders
                    WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH)
                )
                GROUP BY product_id
                ORDER BY total_quantity DESC
                LIMIT 3;
            ");
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($result) {
                $produits = [];
                foreach ($result as $obj) {
                    $stmt = $this->cnx->prepare("SELECT * FROM Products WHERE id = :id");
                    $stmt->bindParam(':id', $obj['product_id']);
                    $stmt->execute();
                    $produit = $stmt->fetch(PDO::FETCH_ASSOC);
                    array_push($produits, new Produit($produit['id'], $produit['product_name'], $produit['category'], $produit['price'], $produit['quantity'], $produit['stock'], $obj['total_quantity']));
                }
                return $produits;
            }
            return false;
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